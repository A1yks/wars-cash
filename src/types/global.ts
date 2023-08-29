import { Types } from 'mongoose';

export enum Roles {
    Admin = 'admin',
    Moderator = 'moderator',
    Premium = 'premium',
    Vip = 'vip',
    User = 'user',
}

export enum BetTypes {
    Blue = 'blue',
    Red = 'red',
}

export type User = {
    id: Types.ObjectId;
    name: string;
    surname: string;
    avatar: string;
    role: Roles;
};

export type Bet = {
    amount: number;
    user: User;
};
