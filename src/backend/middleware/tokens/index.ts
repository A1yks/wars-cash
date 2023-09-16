import { NextFunction } from 'express';
import {
    FacebookAppTokenResponse,
    FacebookVerifyTokenError,
    FacebookVerifyTokenSuccess,
    RefreshTokenCookies,
    TokenPayload,
    TokenProviderVerificationData,
    TokenProviders,
} from './types';
import { errorsHandler, handleServerErrors } from '@backend/utils/errorsHandler';
import { ErrorTypes } from '@backend/enums/errors';
import logger from '@backend/utils/logger';
import TokensService from '@backend/services/tokens';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';

let facebookAccessToken = `${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;

namespace TokensMiddleware {
    function extractAcessToken(headers: Server.Request['headers']) {
        const authHeader = headers.authorization;
        const matched = authHeader?.match(/Bearer\s+(.+)$/);

        if (!matched || !matched[1]) {
            return null;
        }

        return matched[1];
    }

    async function verifyToken(req: Server.Request, res: Server.Response) {
        const token = extractAcessToken(req.headers);

        if (token === null) {
            res.status(403).json({ error: 'Токен авторизации отсутствует' });

            return null;
        }

        const payload = (await TokensService.verifyToken(token)) as TokenPayload;

        return payload;
    }

    export async function mapPayloadDataToRequest(req: Server.Request, res: Server.Response, next: NextFunction) {
        const token = extractAcessToken(req.headers);

        if (token !== null) {
            try {
                const payload = (await TokensService.verifyToken(token)) as TokenPayload;

                req.userId = payload.userId;
            } catch (err) {
                logger.error(err);
            }
        }

        next();
    }

    export async function verifyAcessToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        try {
            const payload = await verifyToken(req, res);

            if (payload === null) {
                return;
            }

            req.userId = payload.userId;

            next();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла непредвиденная ошибка при валидации токена',
                expectedErrors: [
                    [TokenExpiredError, 401],
                    [JsonWebTokenError, 400],
                ],
            });
        }
    }

    export async function verifyRefreshToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        try {
            const cookies = req.cookies as RefreshTokenCookies;
            const refreshTokenString = cookies.refreshToken;

            if (!refreshTokenString) {
                return res.status(400).json({ error: 'Refresh токен не был передан' });
            }

            const refreshToken = await TokensService.getRefreshToken(refreshTokenString);

            if (refreshToken === null) {
                return res.status(400).json({ error: 'Невалидный токен' });
            }

            const isTokenValid = TokensService.verifyRefreshToken(refreshToken);

            if (!isTokenValid) {
                await TokensService.deleteRefreshToken(refreshToken);
                setRefreshTokenCookie(res, refreshTokenString, true);

                return res.status(400).json({ error: 'Истек срок действия токена' });
            }

            const user = await TokensService.getRefreshTokenOwner(refreshToken);

            if (!user) {
                return res.status(404).json({ error: 'Владелец токена не найден' });
            }

            req.userId = user._id;

            next();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла непредвиденная ошибка при валидации токена',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export const verifyProviderToken = handleServerErrors<TokenProviderVerificationData>(async (req, res, next) => {
        const { provider, token } = req.body;

        const validationFunction = providers[provider];

        if (validationFunction === undefined) {
            throw new Error('Указан неизвестный провайдер', { cause: ErrorTypes.BAD_DATA });
        }

        await validationFunction(token);

        next();
    });

    const providers: Record<TokenProviders, (token: string) => Promise<void>> = {
        facebook: verifyFacebookToken,
    };

    async function getFacebookAppToken() {
        const res = await fetch(
            `https://graph.facebook.com/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&grant_type=client_credentials`
        );
        const data = await res.json();

        if (isFacebookAppTokenResponse(data)) {
            return data.access_token;
        }

        throw new Error('Не удалось получить токен приложения Facebook', { cause: ErrorTypes.UNKNOWN });
    }

    async function verifyFacebookToken(token: string) {
        const appToken = facebookAccessToken || (await getFacebookAppToken());
        const res = await fetch(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appToken}`);
        const result = await res.json();

        if (isFacebookVerifyTokenError(result)) {
            throw new Error(result.data.error.message, { cause: ErrorTypes.INVALID_TOKEN });
        }

        if (isFacebookVerifyTokenSuccess(result) && result.data.is_valid) {
            return;
        }

        throw new Error('Не удалось проверить токен Facebook', { cause: ErrorTypes.UNKNOWN });
    }

    function isFacebookAppTokenResponse(data: unknown): data is FacebookAppTokenResponse {
        return typeof data === 'object' && data !== null && 'access_token' in data;
    }

    function isFacebookVerifyTokenError(value: unknown): value is FacebookVerifyTokenError {
        return (value as FacebookVerifyTokenError)?.data?.error !== undefined;
    }

    function isFacebookVerifyTokenSuccess(value: unknown): value is FacebookVerifyTokenSuccess {
        const data = (value as FacebookVerifyTokenSuccess)?.data;

        return data !== undefined && data.user_id !== undefined && data.app_id !== undefined;
    }
}

export default TokensMiddleware;
