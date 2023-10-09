import { IBonus } from '@backend/models/Bonus/types';
import { api } from '.';
import { ClaimBonusRes } from './types';

export const bonusApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBonusInfo: build.query<API.Response<IBonus>, void>({
            query: () => '/bonus/info',
        }),
        claimBonus: build.mutation<API.Response<ClaimBonusRes>, void>({
            query: () => '/bonus/claim',
        }),
    }),
});

export const { useGetBonusInfoQuery, useClaimBonusMutation } = bonusApi;
