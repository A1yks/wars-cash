import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        test: build.query<{ value: number }, void>({
            query: () => ({
                url: '/test',
            }),
        }),
    }),
});

export const { getRunningQueriesThunk } = api.util;
export const { useTestQuery } = api;
