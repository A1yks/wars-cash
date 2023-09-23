import { ErrorTypes } from '@backend/enums/errors';
import { DeleteMessageReq, ModerationReq, SaveMessageReq } from './types';
import { Roles, compareRoles, moderRoles } from '@backend/models/User/types';
import ChatService from '@backend/services/chat';
import UserService from '@backend/services/user';

function isMuted(timeout: number) {
    return timeout === -1 || timeout > Date.now();
}

export async function canDeleteMessage(req: Server.Request<DeleteMessageReq>) {
    const { messageId } = req.body;

    const [moder, message] = await Promise.all([UserService.getUser(req.userId), ChatService.getMessage(messageId)]);

    if (isMuted(moder.chatTimeout)) {
        return false;
    }

    if (message === null) {
        throw new Error('Сообщение не найдено', { cause: ErrorTypes.NOT_FOUND });
    }

    req.permissions = {
        ...req.permissions,
        chat: {
            message,
        },
    };

    return compareRoles(moder.role, message.sender.role);
}

export async function canModerate(req: Server.Request<ModerationReq>) {
    const { userId } = req.body;

    const [moder, user] = await Promise.all([UserService.getUser(req.userId), UserService.getUser(userId)]);

    if (isMuted(moder.chatTimeout)) {
        return false;
    }

    req.permissions = {
        ...req.permissions,
        chat: {
            userToBan: user,
        },
    };

    return compareRoles(moder.role, user.role);
}

export async function canSendMessage(req: Server.Request<SaveMessageReq>) {
    const { sender } = req.body;

    const user = await UserService.getUser(sender._id);

    return user.chatTimeout !== -1 && user.chatTimeout < Date.now();
}

export async function canGetBannedUsers(req: Server.Request) {
    const moder = await UserService.getUser(req.userId);

    if (isMuted(moder.chatTimeout)) {
        return false;
    }

    return moderRoles.includes(moder.role);
}
