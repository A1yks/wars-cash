import { ISiteConfig } from '@backend/models/SiteConfig/types';
import { api } from '.';
import { GetPublicConfigRes } from './types';
import { ChangeSiteConfigReq } from '@backend/controllers/site-config/types';

export const siteConfigApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getConfig: builder.query<API.Response<ISiteConfig>, void>({
            query: () => '/config/full',
        }),
        getPublicConfig: builder.query<API.Response<GetPublicConfigRes>, void>({
            query: () => '/config',
        }),
        changeConfig: builder.mutation<API.Response<ISiteConfig>, ChangeSiteConfigReq>({
            query: (data) => ({
                url: '/config/change',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetConfigQuery, useGetPublicConfigQuery, useChangeConfigMutation } = siteConfigApi;
