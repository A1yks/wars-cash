import { Types, Model, Document } from 'mongoose';
import { IUser } from '../User/types';

export interface IRefreshToken {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    token: string;
    expirityDate: Date;
}

export interface IRefreshTokenModel extends Model<IRefreshToken> {
    issueToken(userId: IUser['_id'], oldTokenStr?: string): Promise<string>;
}

export type RefreshTokenDoc = Document<unknown, {}, IRefreshToken> & IRefreshToken;
