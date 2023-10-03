import { Types } from 'mongoose';
import { IUser, PublicUserData } from '../User/types';

export interface IChatBan {
    _id: Types.ObjectId | string;
    bannedUser: IUser['_id'];
    moderator: IUser['_id'];
    bannedUntil: number;
    reason: string;
}

export type PopulatedChatBanData = Omit<IChatBan, 'bannedUser' | 'moderator'> & {
    bannedUser: IUser;
    moderator: IUser;
};

export type ClientChatBanData = Omit<IChatBan, 'bannedUser' | 'moderator'> & {
    bannedUser: PublicUserData;
    moderator: PublicUserData;
};
