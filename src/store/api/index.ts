import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (build) => ({
        test: build.query<{ value: number }, void>({
            query: () => ({
                url: '/test',
            }),
        }),
    }),
});

export const { useTestQuery } = api;
