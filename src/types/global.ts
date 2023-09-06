import { Types } from 'mongoose';
import { Type } from 'typescript';

export enum Roles {
    Admin = 'admin',
    Moderator = 'moder',
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
    avatar: string;
    role: Roles;
};

export type Bet = {
    amount: number;
    user: User;
};

export type Message = {
    _id: Types.ObjectId;
    sender: User;
    text: string;
};
