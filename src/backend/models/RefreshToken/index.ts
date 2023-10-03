import { Schema, model } from 'mongoose';
import { IRefreshToken, IRefreshTokenModel } from './type';
import { v4 as uuid } from 'uuid';
import { IUser } from '../User/types';

export const expiresIn = 60 * 60 * 24 * 7; // 7 days (in seconds)

const refreshTokenSchema = new Schema<IRefreshToken, IRefreshTokenModel>(
    {
        token: { type: String, default: () => uuid(), unique: true },
        expirityDate: {
            type: Date,
            default: () => {
                return Date.now() + expiresIn * 1000;
            },
        },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        collection: 'refreshTokens',
        statics: {
            async issueToken(userId: IUser['_id'], oldTokenStr?: string) {
                const refreshToken = new this({ user: userId });
                const oldToken = oldTokenStr === undefined ? null : await this.findOne({ token: oldTokenStr });

                if (oldToken === null) {
                    await refreshToken.save();
                } else {
                    await oldToken.updateOne({ token: refreshToken.token, expirityDate: refreshToken.expirityDate });
                }

                return refreshToken.token;
            },
        },
    }
);

refreshTokenSchema.index({ user: 1, token: 1 }, { unique: true });

export default model<IRefreshToken, IRefreshTokenModel>('RefreshToken', refreshTokenSchema);
