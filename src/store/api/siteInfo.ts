import { ChangePageContentReq } from '@backend/controllers/site-info/types';
import { api } from '.';
import { ISiteInfo } from '@backend/models/SiteInfo/types';

export const siteInfoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPageContent: builder.query<API.Response<ISiteInfo>, string>({
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

export const { useGetPageContentQuery, useChangePageContentMutation } = siteInfoApi;
