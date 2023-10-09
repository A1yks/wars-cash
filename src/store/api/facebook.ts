import { IFacebookDeletionInfo } from '@backend/models/FacebookDeletionInfo/types';
import { api } from '.';

export const facebookApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDeletionInfo: build.query<API.Response<IFacebookDeletionInfo>, string>({
            query: (code) => ({
                url: '/facebook/deletion',
                params: { code },
            }),
        }),
    }),
});

export const { useGetDeletionInfoQuery } = facebookApi;
