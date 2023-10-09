import { IBonus } from '@backend/models/Bonus/types';
import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { IDeposit } from '@backend/models/Deposit/types';
import { IPayment } from '@backend/models/Payment/types';
import { ISiteConfig } from '@backend/models/SiteConfig/types';
import { UserAdminInfo } from '@backend/services/user/types';

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

export type GetPublicConfigRes = Omit<ISiteConfig, 'randomOrgApiKey'>;

export type GetPaymentsRes = {
    requests: IPayment[];
    total: number;
};

export type GetUsersRes = {
    users: UserAdminInfo[];
    total: number;
};

export type GetDepositsRes = {
    deposits: IDeposit[];
    total: number;
};
