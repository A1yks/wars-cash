import { Pagination } from '@backend/common/types';
import { PopulatedMessage } from '@backend/models/ChatMessage/types';
import { IUser, PublicUserData } from '@backend/models/User/types';

export type SaveMessageReq = Omit<PopulatedMessage, '_id' | 'sender' | 'date'> & {
    sender: Omit<PublicUserData, '_id'> & {
        _id: string;
    };
};

export type DeleteMessageReq = {
    messageId: string;
};

export type ModerationReq = {
    userId: string;
    // messageId: string;
    period: IUser['chatTimeout'];
    reason: string;
};

export type GetBannesUsersReq = Pagination & {
    filter?: string;
};
