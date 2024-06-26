import { Schema, model } from 'mongoose';
import { ISiteConfig } from './types';
import { Roles } from '../User/types';
import { dev } from '@backend/config';

const siteConfigSchema = new Schema<ISiteConfig>(
    {
        chatMessagesToSave: { type: Number, default: 100 },
        spinDuration: { type: Number, default: 10 },
        betsTime: { type: Number, default: 10 },
        minWithdrawalAmount: { type: Number, default: 100 },
        randomOrgApiKey: { type: String, default: dev ? process.env.RANDOM_ORG_API_KEY : '' },
        sitePercent: { type: Number, default: 5, min: 0, max: 100 },
        bonuses: {
            [Roles.User]: { type: Number, default: 10 },
            [Roles.Vip]: { type: Number, default: 15 },
            [Roles.Premium]: { type: Number, default: 20 },
        },
    },
    { collection: 'siteConfig' }
);

export default model<ISiteConfig>('SiteConfig', siteConfigSchema);
