import { expiresIn } from '@backend/models/RefreshToken';

function setRefreshTokenCookie(res: Server.Response, refreshToken: string, invalidate = false) {
    let maxAge = expiresIn * 1000;

    if (invalidate) {
        maxAge = 0;
    }

    res.cookie('refreshToken', refreshToken, {
        maxAge,
        httpOnly: true,
        sameSite: true,
        secure: true,
    });
}

export default setRefreshTokenCookie;
