import SiteConfig from '@backend/models/SiteConfig';

namespace SiteConfigService {
    export async function getConfig() {
        let config = await SiteConfig.findOne();

        if (config === null) {
            config = await SiteConfig.create({});
        }

        return config;
    }
}

export default SiteConfigService;
