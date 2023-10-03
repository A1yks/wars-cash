import { SaveMessageReq } from '@backend/controllers/chat/types';
import { IChatBan } from '@backend/models/ChatBan/types';

export type SaveMessageData = SaveMessageReq;

export type BannedUserData = Omit<IChatBan, '_id'>;
