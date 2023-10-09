import { Types } from 'mongoose';
import { IUser } from '../User/types';

export interface IBonus {
    _id: Types.ObjectId | string;
    user: IUser['_id'];
    availabilityTime: number;
}
