import { IUser } from '@backend/models/User/types';
import { Types } from 'mongoose';

export type Bet = {
    amount: number;
    user: IUser;
};

export type Message = {
    _id: Types.ObjectId;
    sender: IUser;
    text: string;
};
