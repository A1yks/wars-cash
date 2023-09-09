import { Schema, model } from 'mongoose';
import { IUser, Roles } from './types';

const userSchema = new Schema<IUser>(
    {
        avatar: { type: String, default: 'avatar.jpg' },
        facebookId: { type: String, required: true },
        name: { type: String, required: true },
        balance: { type: Number, default: 0 },
        role: { type: String, default: Roles.User, enum: Object.values(Roles) },
    },
    { collection: 'users' }
);

export default model<IUser>('User', userSchema);
