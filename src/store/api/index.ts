import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import setAuthHeaders from './helpers/setAuthHeaders';
import baseQueryWithReauth from './helpers/baseQueryWithReauth';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({}),
});

export const { getRunningQueriesThunk } = api.util;
