import { Schema, model } from 'mongoose';
import { IUser, Roles } from './types';
import formatNumber from '@backend/utils/formatBalance';

const userSchema = new Schema<IUser>(
    {
        avatar: { type: String, default: 'avatar.jpg' },
        provider: { type: String, required: true, enum: ['facebook'] },
        providerAccountId: { type: String, required: true },
        name: { type: String, required: true },
        balance: {
            type: Number,
            default: 0,
            get: (balance: number) => formatNumber(balance / 100),
            set: (balance: number) => formatNumber(balance * 100),
        },
        role: { type: String, default: Roles.User, enum: Object.values(Roles) },
    },
    {
        collection: 'users',
        toJSON: {
            getters: true,
        },
    }
);

export default model<IUser>('User', userSchema);
