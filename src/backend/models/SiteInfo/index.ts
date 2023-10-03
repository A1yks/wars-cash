import { Schema, model } from 'mongoose';
import { ISiteInfo, siteInfoTypes } from './types';

const siteInfoSchema = new Schema<ISiteInfo>(
    {
        type: { type: String, required: true, enum: siteInfoTypes, unique: true },
        content: { type: String, required: true },
    },
    { collection: 'siteInfo' }
);

export default model<ISiteInfo>('SiteInfo', siteInfoSchema);
