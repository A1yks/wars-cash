import { ISiteConfig } from '@backend/models/SiteConfig/types';
import { Roles } from '@backend/models/User/types';

export type ChangeSiteConfigReq = Partial<Omit<ISiteConfig, '_id' | 'bonuses'>> & {
    bonuses?: RequireAtLeastOne<ISiteConfig['bonuses'], Roles.User | Roles.Vip | Roles.Premium>;
};
