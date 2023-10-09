import { AppStore } from 'store';
import { siteConfigApi } from 'store/api/siteConfig';
import getInitialPageProps from 'utils/getInitialPageProps';

export async function loadSiteConfigHelper(store: AppStore) {
    await store.dispatch(siteConfigApi.endpoints.getPublicConfig.initiate());
}

const loadCities = getInitialPageProps(async (store) => {
    await loadSiteConfigHelper(store);
});

export default loadCities;
