import { ISiteInfo } from '@backend/models/SiteInfo/types';

export type GetPageContentReq = {
    type: ISiteInfo['type'];
};

export type ChangePageContentReq = {
    type: ISiteInfo['type'];
    data: Partial<Omit<ISiteInfo, '_id' | 'type'>>;
};
