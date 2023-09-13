import { TokenProviders } from '@backend/middleware/tokens/types';
import { Types } from 'mongoose';

export enum Roles {
    Admin = 'admin',
    Moderator = 'moder',
    Premium = 'premium',
    Vip = 'vip',
    User = 'user',
}

export interface IUser {
    _id: Types.ObjectId;
    provider: TokenProviders;
    providerAccountId: string;
    name: string;
    avatar: string;
    balance: number;
    role: Roles;
}

export type ClientUser = IUser;

export type PublicUserData = Pick<IUser, '_id' | 'name' | 'avatar' | 'role'>;
