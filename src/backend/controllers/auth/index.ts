import { AuthReq } from '@backend/controllers/auth/types';
import { RefreshTokenCookies } from '@backend/middleware/tokens/types';
import AuthService from '@backend/services/auth';
import TokensService from '@backend/services/tokens';
import UserService from '@backend/services/user';
import { handleServerErrors } from '@backend/utils/errorsHandler';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';

namespace AuthController {
    export const authenticate = handleServerErrors<AuthReq>(async (req, res) => {
        const { refreshToken } = req.cookies as Partial<RefreshTokenCookies>;
        const { user, isCreated } = await UserService.findOrCreate(req.body);
        const tokens = await TokensService.issueTokens(user.id, user.role, refreshToken);
        const status = isCreated ? 201 : 200;

        setRefreshTokenCookie(res, tokens.refreshToken);
        res.status(status).json({ data: { user, accessToken: tokens.accessToken } });
    });

    export const logout = handleServerErrors(async (req, res) => {
        const { refreshToken } = req.cookies as Partial<RefreshTokenCookies>;

        await TokensService.deleteRefreshToken({ token: refreshToken });

        if (refreshToken !== undefined) {
            setRefreshTokenCookie(res, refreshToken, true);
        }

        res.status(204).send();
    });
}

export default AuthController;
