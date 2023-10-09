import { AnyAction, Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authSlice from './reducers/authSlice';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import userSlice from './reducers/userSlice';
import gameSlice from './reducers/gameSlice';
import lastGamesSlice from './reducers/lastGamesSlice';
import chatSlice from './reducers/chatSlice';
import paymentsSlice from './reducers/paymentsSlice';
import bonusSlice from './reducers/bonusSlice';
import siteConfigSlice from './reducers/siteConfigSlice';
import usersInfoSlice from './reducers/usersInfoSlice';
import siteInfoSlice from './reducers/siteInfoSlice';

export let store: ReturnType<typeof configStore>;

const combineReducer = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    game: gameSlice.reducer,
    chat: chatSlice.reducer,
    lastGames: lastGamesSlice.reducer,
    payments: paymentsSlice.reducer,
    bonus: bonusSlice.reducer,
    siteConfig: siteConfigSlice.reducer,
    siteInfo: siteInfoSlice.reducer,
    usersInfo: usersInfoSlice.reducer,
    [api.reducerPath]: api.reducer,
});

const reducer: Reducer<ReturnType<typeof combineReducer>, AnyAction> = (state, action) => {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    }

    return combineReducer(state, action);
};

const configStore = () =>
    configureStore({
        reducer,
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(api.middleware);
        },
        devTools: true,
    });

function makeStore() {
    store = configStore();

    return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
