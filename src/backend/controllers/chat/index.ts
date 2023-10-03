import { handleServerErrors } from '@backend/utils/errorsHandler';
import { GetBannesUsersReq, ModerationReq, SaveMessageReq } from './types';
import ChatService from '@backend/services/chat';
import SocketService from '@backend/services/socket';
import { Types } from 'mongoose';
import { ErrorTypes } from '@backend/enums/errors';
import ChatMessage from '@backend/models/ChatMessage';
import { Rooms } from '@backend/services/socket/types';
import { Pagination } from '@backend/common/types';

namespace ChatController {
    export const saveMessage = handleServerErrors<SaveMessageReq>(async (req, res) => {
        const message = await ChatService.saveMessage(req.body);

        SocketService.broadcastMessage(message);

        res.status(204).send();
    });

    export const getMessages = handleServerErrors(async (req, res) => {
        const messages = await ChatService.getMessages();

        res.status(200).json({ data: messages });
    });

    export const deleteMessage = handleServerErrors<ModerationReq>(async (req, res) => {
        const { message } = req.permissions.chat;

        if (message === undefined || message.sender instanceof Types.ObjectId) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        await ChatService.deleteMessage(req.permissions.chat.message as InstanceType<typeof ChatMessage>);

        res.status(204).send();
    });

    export const moderate = handleServerErrors<ModerationReq>(async (req, res) => {
        const { userId, period, reason } = req.body;
        const moderId = req.userId;

        await ChatService.moderate(userId, period, moderId, reason);

        res.status(204).send();
    });

    export const getBannedUsers = handleServerErrors<void, void, GetBannesUsersReq>(async (req, res) => {
        const { limit = 10, offset = 0, filter } = req.query;
        const data = await ChatService.getBannedUsersData(limit, offset, filter);

        res.status(200).json({ data });
    });
}

export default ChatController;
