import { AnyAction, Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlide';
import { api } from './api';
import authSlice from './reducers/authSlice';

const combineReducer = combineReducers({
    test: testSlice.reducer,
    auth: authSlice.reducer,
    [api.reducerPath]: api.reducer,
});

const reducer: Reducer<ReturnType<typeof combineReducer>, AnyAction> = (state, action) => {
    if (action.type === 'HYDRATE') {
        return { ...state, ...action.payload };
    }

    return combineReducer(state, action);
};

export const store = configureStore({
    reducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(api.middleware);
    },
    devTools: true,
});

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];
