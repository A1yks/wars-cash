import { TokenProviderVerificationData } from '@backend/middleware/tokens/types';

export type AuthReq = {
    providerAccountId: string;
    name: string;
    avatar?: string;
} & TokenProviderVerificationData;
