import { IUser } from 'backend/models/User';
import { Types } from 'mongoose';

export enum BetTypes {
    Blue = 'blue',
    Red = 'red',
}

export type Bet = {
    amount: number;
    user: IUser;
};

export type Message = {
    _id: Types.ObjectId;
    sender: IUser;
    text: string;
};
