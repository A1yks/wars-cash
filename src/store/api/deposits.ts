import { GetDepositsReq } from '@backend/controllers/deposits/types';
import { api } from '.';
import { GetDepositsRes } from './types';

export const depositsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDeposits: build.query<API.Response<GetDepositsRes>, GetDepositsReq>({
            query: (data) => ({
                url: '/deposits',
                params: data,
            }),
        }),
    }),
});

export const { useGetDepositsQuery, useLazyGetDepositsQuery } = depositsApi;
