import SiteConfig from '@backend/models/SiteConfig';
import { UpdateConfigData } from './types';
import { ISiteConfig } from '@backend/models/SiteConfig/types';

namespace SiteConfigService {
    export async function getConfig() {
        let config = await SiteConfig.findOne();

        if (config === null) {
            config = await SiteConfig.create({});
        }

        return config;
    }

    export async function getPublicConfig() {
        const config = await getConfig();
        const json = config.toJSON();

        delete (json as Partial<ISiteConfig>).randomOrgApiKey;

        return json as Omit<ISiteConfig, 'randomOrgApiKey'>;
    }

    export async function updateConfig(config: UpdateConfigData) {
        const currentConfig = await getConfig();

        currentConfig.set(config);

        await currentConfig.save();

        return currentConfig;
    }
}

export default SiteConfigService;
