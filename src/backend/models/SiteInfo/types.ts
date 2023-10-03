import { Types } from 'mongoose';

export enum SiteInfoTypes {
    FAQ = 'faq',
    PrivacyPolicy = 'privacyPolicy',
    UserAgreement = 'userAgreement',
}

export const siteInfoTypes = Object.values(SiteInfoTypes);

export interface ISiteInfo {
    _id: Types.ObjectId | string;
    type: SiteInfoTypes;
    content: string;
}
