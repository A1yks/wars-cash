import { ISiteInfo } from '@backend/models/SiteInfo/types';

export type GetPageContentReq = Pick<ISiteInfo, 'type'>;

export type ChangePageContentReq = Omit<ISiteInfo, '_id'>;
