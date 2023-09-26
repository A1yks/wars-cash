import { IBonus } from '@backend/models/Bonus/types';
import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { IPayment } from '@backend/models/Payment/types';

export type GetBannesUsersRes = {
    bannedUsers: ClientChatBanData[];
    total: number;
};

export type CreatePaymentOrderRes = {
    payment: IPayment;
    balance: number;
};

export type ClaimBonusRes = {
    bonusInfo: IBonus;
    balance: number;
};
