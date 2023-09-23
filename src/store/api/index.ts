import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import baseQueryWithReauth from './helpers/baseQueryWithReauth';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getSiteConfig: build.query({
            query: () => '/site-config',
        }),
    }),
});

export const { getRunningQueriesThunk } = api.util;
