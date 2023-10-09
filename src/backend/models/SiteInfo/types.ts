import { Types } from 'mongoose';

export enum SiteInfoTypes {
    FAQ = 'faq',
    PrivacyPolicy = 'privacy-policy',
    UserAgreement = 'user-agreement',
}

export const siteInfoTypes = Object.values(SiteInfoTypes);

export interface ISiteInfo {
    _id: Types.ObjectId | string;
    type: SiteInfoTypes;
    title: string;
    content: string;
}
