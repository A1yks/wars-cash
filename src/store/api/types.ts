import { ClientChatBanData } from '@backend/models/ChatBan/types';

export type GetBannesUsersRes = {
    bannedUsers: ClientChatBanData[];
    total: number;
};
