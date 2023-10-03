import RefreshToken from '@backend/models/RefreshToken';
import { ErrorTypes } from '@backend/enums/errors';
import jwt from 'jsonwebtoken';
import { IUser, Roles } from '@backend/models/User/types';
import { IRefreshToken, RefreshTokenDoc } from '@backend/models/RefreshToken/type';
import { FilterQuery } from 'mongoose';

namespace TokensService {
    export const expiresIn = 60 * 60 * 3; // in seconds

    export async function issueAccessToken(userId: IUser['_id'], role: Roles) {
        return new Promise<string>((resolve, reject) => {
            jwt.sign({ userId, role }, process.env.TOKEN_SECRET, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else if (token === undefined) {
                    reject("Token wasn't created");
                } else {
                    resolve(token);
                }
            });
        });
    }

    export async function issueTokens(userId: IUser['_id'], role: Roles, refreshTokenStr?: string) {
        const accessTokenPromise = issueAccessToken(userId, role);
        const refreshTokenPromise = RefreshToken.issueToken(userId, refreshTokenStr);

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

        return { accessToken, refreshToken };
    }

    export async function verifyToken(token: string) {
        return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenPayload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tokenPayload);
                }
            });
        });
    }

    export async function getRefreshToken(refreshTokenString: IRefreshToken['token']) {
        return await RefreshToken.findOne({ token: refreshTokenString });
    }

    export async function getRefreshTokenOwner(refreshToken: RefreshTokenDoc) {
        const populatedDoc = await refreshToken.populate<{ user: IUser | null }>('user');

        return populatedDoc.user;
    }

    export function verifyRefreshToken(refreshToken: RefreshTokenDoc) {
        return refreshToken.expirityDate.getTime() >= Date.now();
    }

    export async function deleteRefreshToken(refreshTokenDataOrInstance: InstanceType<typeof RefreshToken> | Partial<IRefreshToken>) {
        let refreshToken: RefreshTokenDoc | null = null;

        if (refreshTokenDataOrInstance instanceof RefreshToken) {
            refreshToken = refreshTokenDataOrInstance;
        } else {
            refreshToken = await RefreshToken.findOne(refreshTokenDataOrInstance as Partial<IRefreshToken>);
        }

        if (refreshToken === null) {
            throw new Error('Переданного refresh токена не существует', { cause: ErrorTypes.NOT_FOUND });
        }

        await refreshToken.deleteOne();
    }
}

export default TokensService;
