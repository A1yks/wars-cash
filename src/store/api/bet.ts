import { PlaceBetReq } from '@backend/controllers/bets/types';
import { api } from '.';
import { IGameResult } from '@backend/models/GameResult/types';

export const betsApi = api.injectEndpoints({
    endpoints: (build) => ({
        placeBet: build.mutation<API.Response<number>, PlaceBetReq>({
            query: (data) => ({
                url: '/bets',
                body: data,
                method: 'POST',
            }),
        }),
        getLastGames: build.query<API.Response<IGameResult[]>, void>({
            query: () => ({
                url: '/bets/last-games',
            }),
        }),
    }),
});

export const { usePlaceBetMutation } = betsApi;
