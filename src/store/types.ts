import { ClientUser } from '@backend/models/User/types';

export type AuthRes = {
    user: ClientUser;
    accessToken: string;
    cookie?: string;
};
