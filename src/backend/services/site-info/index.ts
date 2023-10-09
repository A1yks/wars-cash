import SiteInfo from '@backend/models/SiteInfo';
import { ISiteInfo } from '@backend/models/SiteInfo/types';

namespace SiteInfoService {
    export async function getPagesInfo() {
        const pages = await SiteInfo.find();

        return pages;
    }

    export async function getPage(type: ISiteInfo['type']) {
        const page = await SiteInfo.findOne({ type });

        if (page === null) {
            return createPage({ type, title: 'Новая страница', content: '' });
        }

        return page;
    }

    export async function updatePage(type: ISiteInfo['type'], data: Partial<Omit<ISiteInfo, '_id'>>) {
        const page = await getPage(type);

        page.set(data);

        await page.save();

        return page;
    }

    async function createPage(pageData: Omit<ISiteInfo, '_id'>) {
        return await SiteInfo.create(pageData);
    }
}

export default SiteInfoService;
