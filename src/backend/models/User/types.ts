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
    facebookId: string;
    name: string;
    avatar: string;
    balance: number;
    role: Roles;
}

export interface IClientUser {
    _id: Types.ObjectId;
    name: string;
    avatar: string;
    balance: number;
    role: Roles;
}
