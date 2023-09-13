import { RefreshTokenCookies } from '@backend/middleware/tokens/types';
import TokensService from '@backend/services/tokens';
import UserService from '@backend/services/user';
import setRefreshTokenCookie from '@backend/utils/setRefreshTokenCookie';

namespace TokensController {
    export function sendVerifiedResponse(req: Server.Request, res: Server.Response) {
        res.status(204).send();
    }

    export async function renewAccessToken(req: Server.Request, res: Server.Response) {
        if (!req.userId) {
            return res.status(401).json({ error: 'Пользователь не определен' });
        }

        const cookies = req.cookies as RefreshTokenCookies;

        try {
            const user = await UserService.getUser(req.userId);

            if (user === null) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            const { accessToken, refreshToken } = await TokensService.issueTokens(user.id, user.role, cookies.refreshToken);

            setRefreshTokenCookie(res, refreshToken);
            res.status(201).json({ data: { user, accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'Произошла непредвиденная ошибка при попытке обновить токен' });
        }
    }
}

export default TokensController;
