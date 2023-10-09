import { Schema, model } from 'mongoose';
import { ISiteInfo, siteInfoTypes } from './types';

const siteInfoSchema = new Schema<ISiteInfo>(
    {
        type: { type: String, required: true, enum: siteInfoTypes, unique: true },
        title: { type: String, required: true },
        content: { type: String, default: '' },
    },
    { collection: 'siteInfo' }
);

export default model<ISiteInfo>('SiteInfo', siteInfoSchema);
