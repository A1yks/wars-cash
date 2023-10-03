import { AppStore } from 'store';
import { betsApi } from 'store/api/bet';
import getInitialPageProps from 'utils/getInitialPageProps';

export async function loadLastGamesHelper(store: AppStore) {
    await store.dispatch(betsApi.endpoints.getLastGames.initiate());
}

const loadCities = getInitialPageProps(async (store) => {
    await loadLastGamesHelper(store);
});

export default loadCities;
