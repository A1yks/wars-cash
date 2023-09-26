import { TokenProviders } from '@backend/middleware/tokens/types';
import { Types } from 'mongoose';

export enum Roles {
    MainAdmin = 'chiefAdmin',
    Admin = 'admin',
    Moderator = 'moder',
    Premium = 'premium',
    Vip = 'vip',
    User = 'user',
}

export const roleValues = Object.values(Roles);

export const adminRoles = [Roles.MainAdmin, Roles.Admin];

export const moderRoles = [...adminRoles, Roles.Moderator];

export function isAdmin(role: Roles) {
    return adminRoles.includes(role);
}

export function isModer(role: Roles) {
    return moderRoles.includes(role);
}

export function compareRoles(moderRole: Roles, userRole: Roles) {
    switch (moderRole) {
        case Roles.Moderator: {
            return userRole !== Roles.MainAdmin && userRole !== Roles.Admin && userRole !== Roles.Moderator;
        }
        case Roles.Admin: {
            return userRole !== Roles.MainAdmin && userRole !== Roles.Admin;
        }
        case Roles.MainAdmin: {
            return userRole !== Roles.MainAdmin;
        }
    }

    return false;
}

export interface IUser {
    _id: Types.ObjectId | string;
    provider: TokenProviders;
    providerAccountId: string;
    name: string;
    avatar: string;
    balance: number;
    role: Roles;
    chatTimeout: number;
    isBanned: boolean;
}

export type ClientUser = IUser;

export type PublicUserData = Pick<IUser, '_id' | 'name' | 'avatar' | 'role'>;
