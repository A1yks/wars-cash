import { Schema, model } from 'mongoose';
import { IChatBan } from './types';
import UserService from '@backend/services/user';

const chatBanSchema = new Schema<IChatBan>(
    {
        bannedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        moderator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bannedUntil: { type: Number, required: true },
        reason: { type: String, required: true },
    },
    {
        collection: 'chatBans',
        toJSON: {
            transform(doc, ret) {
                ret.bannedUser = UserService.getPublicUserData(ret.bannedUser);
                ret.moderator = UserService.getPublicUserData(ret.moderator);
            },
        },
    }
);

export default model<IChatBan>('ChatBan', chatBanSchema);
