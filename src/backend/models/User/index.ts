import { Schema, model } from 'mongoose';
import { IUser, Roles } from './types';
import formatNumber from '@backend/utils/formatNumber';
import { dev } from '@backend/config';

const userSchema = new Schema<IUser>(
    {
        avatar: { type: String, default: 'avatar.jpg' },
        provider: { type: String, required: true, enum: ['facebook'] },
        providerAccountId: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        balance: {
            type: Number,
            default: dev ? 1000000 : 0,
        },
        role: { type: String, default: Roles.User, enum: Object.values(Roles) },
        chatTimeout: { type: Number, default: 0 },
        isBanned: { type: Boolean, default: false },
    },
    {
        collection: 'users',
        toJSON: {
            transform(doc, ret, options) {
                ret.balance = formatNumber(ret.balance / 100);
            },
        },
    }
);

export default model<IUser>('User', userSchema);
