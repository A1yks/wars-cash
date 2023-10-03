import { IUser } from '@backend/models/User/types';

export type RefreshTokenCookies = {
    refreshToken: string;
};

export type TokenPayload = {
    userId: IUser['_id'];
};

export type TokenProviders = 'facebook';

export type TokenProviderVerificationData = {
    token: string;
    provider: TokenProviders;
};

export type FacebookAppTokenResponse = {
    access_token: string;
    token_type: string;
};

export type FacebookVerifyTokenError = {
    data: {
        error: {
            code: number;
            message: string;
        };
        is_valid: boolean;
        scopes: any[];
    };
};

export type FacebookVerifyTokenSuccess = {
    data: {
        app_id: number;
        type: string;
        application: string;
        expires_at: number;
        is_valid: boolean;
        issued_at: number;
        metadata: { sso: string };
        scopes: string[];
        user_id: string;
    };
};

export type FacebookVerifyTokenResponse = FacebookVerifyTokenError | FacebookVerifyTokenSuccess;
