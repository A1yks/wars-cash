import { IGameResult } from '@backend/models/GameResult/types';
import { BetTypes } from '@backend/services/game/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { betsApi } from 'store/api/bet';

type LastGamesState = {
    fullGamesInfo: IGameResult[];
    simpleResults: BetTypes[];
};

const initialState: LastGamesState = {
    fullGamesInfo: [],
    simpleResults: [],
};

const lastGamesSlice = createSlice({
    name: 'lastGames',
    initialState,
    reducers: {
        addGameResult(state, action: PayloadAction<IGameResult>) {
            state.simpleResults = state.simpleResults.slice(-7).concat(action.payload.winner);
        },
    },
    extraReducers(builder) {
        return builder.addMatcher(betsApi.endpoints.getLastGames.matchFulfilled, (state, action) => {
            state.simpleResults = action.payload.data.map((game) => game.winner);
        });
    },
});

export default lastGamesSlice;
