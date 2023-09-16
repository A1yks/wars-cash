import { Schema, model } from 'mongoose';
import { IUser, Roles } from './types';
import formatNumber from '@backend/utils/formatNumber';

const userSchema = new Schema<IUser>(
    {
        avatar: { type: String, default: 'avatar.jpg' },
        provider: { type: String, required: true, enum: ['facebook'] },
        providerAccountId: { type: String, required: true },
        name: { type: String, required: true },
        balance: {
            type: Number,
            default: 1000000,
        },
        role: { type: String, default: Roles.User, enum: Object.values(Roles) },
    },
    {
        collection: 'users',
        toJSON: {
            getters: true,
            transform(doc, ret, options) {
                ret.balance = formatNumber(ret.balance / 100);
            },
        },
    }
);

export default model<IUser>('User', userSchema);
