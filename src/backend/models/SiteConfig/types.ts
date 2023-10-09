import { Types } from 'mongoose';
import { Roles } from '../User/types';

export interface ISiteConfig {
    _id: Types.ObjectId;
    chatMessagesToSave: number;
    spinDuration: number;
    betsTime: number;
    minWithdrawalAmount: number;
    randomOrgApiKey: string;
    bonuses: {
        [Roles.User]: number;
        [Roles.Vip]: number;
        [Roles.Premium]: number;
    };
}
