import { ChangePageContentReq } from '@backend/controllers/site-info/types';
import { api } from '.';
import { ISiteInfo, SiteInfoTypes } from '@backend/models/SiteInfo/types';

export const siteInfoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPagesInfo: builder.query<API.Response<ISiteInfo[]>, void>({
            query: () => `/info`,
        }),
        getPageContent: builder.query<API.Response<ISiteInfo>, SiteInfoTypes>({
            query: (type) => `/info/${type}`,
        }),
        changePageContent: builder.mutation<API.Response<ISiteInfo>, ChangePageContentReq>({
            query: (data) => ({
                url: `/info/change`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetPageContentQuery, useLazyGetPageContentQuery, useChangePageContentMutation, useGetPagesInfoQuery } = siteInfoApi;
