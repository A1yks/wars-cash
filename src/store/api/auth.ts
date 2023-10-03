import { AuthReq } from '@backend/controllers/auth/types';
import { api } from '.';
import { AuthRes } from 'store/types';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        auth: build.mutation<API.Response<AuthRes>, AuthReq>({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: data,
            }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        getAccessToken: build.query<API.Response<AuthRes>, string>({
            query: (cookie) => ({
                url: '/tokens/renew',
                headers: {
                    cookie,
                },
            }),
            transformResponse(response: API.Response<AuthRes>, meta) {
                const cookie = meta?.response?.headers.get('set-cookie');

                if (typeof cookie === 'string') {
                    response.data.cookie = cookie;
                }

                return response;
            },
        }),
    }),
});

export const { getAccessToken } = authApi.endpoints;
export const { useAuthMutation, useLogoutMutation } = authApi;
