import ChatMessage from '@backend/models/ChatMessage';
import SiteConfigService from '../site-config';
import { BannedUserData, SaveMessageData } from './types';
import { IChatMessage, PopulatedMessage } from '@backend/models/ChatMessage/types';
import { FilterQuery, Types, get } from 'mongoose';
import { IUser, PublicUserData } from '@backend/models/User/types';
import UserService from '../user';
import User from '@backend/models/User';
import SocketService from '../socket';
import { Rooms } from '../socket/types';
import ChatBan from '@backend/models/ChatBan';
import { ClientChatBanData, IChatBan, PopulatedChatBanData } from '@backend/models/ChatBan/types';

namespace ChatService {
    export async function saveMessage(message: SaveMessageData) {
        const config = await SiteConfigService.getConfig();
        const maxMessagesToSave = config.chatMessagesToSave;

        const messagesCount = await ChatMessage.countDocuments();
        const messagesToDelete = Math.max(messagesCount - maxMessagesToSave + 1, 0);

        if (messagesToDelete > 0) {
            const docsToDelete = await ChatMessage.find()
                .sort({ date: -1 })
                .skip(messagesCount - messagesToDelete);

            await Promise.all(docsToDelete.map((doc) => doc.deleteOne()));
        }

        const savedMessage = await ChatMessage.create(message);
        const populatedMessage = await savedMessage.populate('sender');

        return populatedMessage.toJSON() as PopulatedMessage;
    }

    export async function getMessages() {
        const messages = await ChatMessage.find().sort({ date: 1 }).populate<{ sender: IUser | PublicUserData }>('sender').lean();

        messages.forEach((msg) => {
            msg.sender = UserService.getPublicUserData(msg.sender as IUser);
        });

        return messages;
    }

    export async function getMessage(messageId: Types.ObjectId | string) {
        const message = await ChatMessage.findById(messageId).populate<PopulatedMessage>('sender');

        return message;
    }

    export async function deleteMessage(message: InstanceType<typeof ChatMessage>) {
        await message.deleteOne();
        SocketService.broadcastData(Rooms.All, 'messageDeleted', { messageId: message._id });
    }

    export async function deleteMessages(userId: IUser['_id']) {
        const messages = await ChatMessage.find({ sender: userId });

        await Promise.all(messages.map((message) => message.deleteOne()));
    }

    export async function moderate(userId: IUser['_id'], period: IUser['chatTimeout'], moderId: IUser['_id'], reason: string) {
        const user = await UserService.getUser(userId);

        if (typeof period === 'number') {
            if (period === -1) {
                user.chatTimeout = period;
            } else {
                user.chatTimeout = Date.now() + period * 1000;
            }
        } else {
            user.chatTimeout = period;
        }

        await Promise.all([
            user.save(),
            updateBannedUserData({
                bannedUntil: user.chatTimeout,
                bannedUser: user._id,
                moderator: moderId,
                reason,
            }),
        ]);
        await deleteMessages(user._id);
        SocketService.broadcastData(Rooms.All, 'restrictChatAccess', { userId: user._id, period: user.chatTimeout });

        return user;
    }

    export async function createBannedUserData(data: BannedUserData) {
        return await ChatBan.create(data);
    }

    export async function updateBannedUserData(data: BannedUserData) {
        const bannedUserData = await getBannedUserData(data.bannedUser, false);

        if (bannedUserData === null) {
            return await createBannedUserData(data);
        }

        bannedUserData.bannedUntil = data.bannedUntil < -1 ? 0 : data.bannedUntil;
        bannedUserData.reason = data.reason;
        bannedUserData.moderator = data.moderator;

        await bannedUserData.save();

        return bannedUserData;
    }

    export async function deleteBannedUserData(userId: IUser['_id']) {
        return await ChatBan.findOneAndDelete({ bannedUser: userId });
    }

    export async function getBannedUserData(userId: IUser['_id'], populate = true) {
        const data = await ChatBan.findOne({ bannedUser: userId });

        if (data === null) {
            return null;
        }

        if (populate) {
            return await data.populate<PopulatedChatBanData>('bannedUser moderator');
        }

        return data;
    }

    export async function getPublicBannedUserData(userId: IUser['_id']) {
        const data = await getBannedUserData(userId);

        if (data === null) {
            return null;
        }

        return data.toJSON() as PopulatedChatBanData;
    }

    export async function getBannedUsersData(limit: number, offset: number, filter?: string) {
        let usersIds: IUser['_id'][] = [];

        if (filter !== undefined) {
            usersIds = await User.find({ name: { $regex: filter, $options: 'i' } })
                .select('_id')
                .lean();
        }

        const bannedUsersQuery: FilterQuery<IChatBan> =
            filter !== undefined
                ? {
                      $and: [{ bannedUser: { $in: usersIds } }, { $or: [{ bannedUntil: { $gt: Date.now() } }, { bannedUntil: { $eq: -1 } }] }],
                  }
                : {
                      $or: [{ bannedUntil: { $gt: Date.now() } }, { bannedUntil: { $eq: -1 } }],
                  };
        const [bannedUsers, total] = await Promise.all([
            ChatBan.find(bannedUsersQuery).skip(offset).limit(limit).populate<PopulatedChatBanData>('bannedUser moderator'),
            ChatBan.countDocuments(bannedUsersQuery),
        ]);

        return { bannedUsers, total };
    }
}

export default ChatService;
