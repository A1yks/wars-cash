import { Types, Model, Document } from 'mongoose';

export interface IRefreshToken {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    token: string;
    expirityDate: Date;
}

export interface IRefreshTokenModel extends Model<IRefreshToken> {
    issueToken(userId: Types.ObjectId, oldTokenStr?: string): Promise<string>;
}

export type RefreshTokenDoc = Document<unknown, {}, IRefreshToken> & IRefreshToken;
