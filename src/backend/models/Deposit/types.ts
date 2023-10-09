import { Types } from 'mongoose';
import { IUser } from '../User/types';

export interface IDeposit {
    _id: Types.ObjectId | string;
    user: IUser['_id'];
    sum: number;
    date: Date;
}
