import { PlaceBetReq } from '@backend/controllers/bets/types';
import { api } from '.';

export const betsApi = api.injectEndpoints({
    endpoints: (build) => ({
        placeBet: build.mutation<API.Response<number>, PlaceBetReq>({
            query: (data) => ({
                url: '/bets',
                body: data,
                method: 'POST',
            }),
        }),
    }),
});

export const { usePlaceBetMutation } = betsApi;
