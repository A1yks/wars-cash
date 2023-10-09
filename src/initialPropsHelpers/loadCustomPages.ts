import { SiteInfoTypes } from '@backend/models/SiteInfo/types';
import { AppStore } from 'store';
import { siteInfoApi } from 'store/api/siteInfo';
import getInitialPageProps from 'utils/getInitialPageProps';

export async function loadCustomPagesHelper(store: AppStore, pageType: SiteInfoTypes) {
    await store.dispatch(siteInfoApi.endpoints.getPageContent.initiate(pageType));
}

export async function loadCustomPagesInfoHelper(store: AppStore) {
    await store.dispatch(siteInfoApi.endpoints.getPagesInfo.initiate());
}

const loadCustomPage = getInitialPageProps(async (store, ctx) => {
    const pageType = ctx.query.type as SiteInfoTypes;
    await loadCustomPagesHelper(store, pageType);
});

export default loadCustomPage;
