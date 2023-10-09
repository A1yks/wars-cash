import { RandomOrgClient } from '@randomorg/core';
import SiteConfigService from '../site-config';

namespace RandomOrgService {
    let client: RandomOrgClient;

    export async function setupClient() {
        const siteConfig = await SiteConfigService.getConfig();
        const { randomOrgApiKey } = siteConfig;

        client = new RandomOrgClient(randomOrgApiKey);
    }

    export async function getRandomInt(min: number, max: number) {
        const result = await client.generateSignedIntegers(1, min, max);

        return result.data[0] as number;
    }
}

export default RandomOrgService;
