import SiteInfo from '@backend/models/SiteInfo';
import { SiteInfoTypes } from '@backend/models/SiteInfo/types';

namespace SiteInfoService {
    export async function getPage(type: SiteInfoTypes) {
        const page = await SiteInfo.findOne({ type });

        if (page === null) {
            return await createPage(type);
        }

        return page;
    }

    export async function updatePage(type: SiteInfoTypes, content: string) {
        const page = await getPage(type);

        page.content = content;

        await page.save();
    }

    async function createPage(type: SiteInfoTypes) {
        return await SiteInfo.create({ type });
    }
}

export default SiteInfoService;
