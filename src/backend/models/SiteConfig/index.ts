import { Schema, model } from 'mongoose';
import { ISiteConfig } from './types';

const siteConfigSchema = new Schema<ISiteConfig>(
    {
        chatMessagesToSave: { type: Number, default: 100 },
        spinDuration: { type: Number, default: 10 },
    },
    { collection: 'siteConfig', capped: { size: 1024, max: 1 } }
);

export default model<ISiteConfig>('SiteConfig', siteConfigSchema);
