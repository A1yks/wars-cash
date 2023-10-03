import { BetTypes, GameData, GameEventPayload } from '@backend/services/game/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GameState = GameData & { winner: BetTypes | null; rotation: number; spinningPercent: number };

const initialState = {
    blueTeam: {
        bank: 0,
        bettors: [],
        coeff: 2,
        percent: 50,
        values: [501, 1000],
    },
    redTeam: {
        bank: 0,
        bettors: [],
        coeff: 2,
        percent: 50,
        values: [1, 500],
    },
    percentageValue: 1000,
    remainingTime: 10,
    isGameStarted: false,
    winner: null,
    rotation: 0,
    spinningPercent: 0,
    isAcceptingBets: true,
    isSpinning: false,
    isCancelled: false,
} as GameState;

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<Partial<GameData>>) {
            const newState: GameState = { ...state, ...action.payload };

            return newState;
        },
        resetCustomFields(state) {
            state.winner = null;
            state.rotation = 0;
            state.spinningPercent = 0;
        },
        resetGame() {
            return initialState;
        },
        setWinner(state, action: PayloadAction<GameState['winner']>) {
            state.winner = action.payload;
        },
        setDegreesData(state, action: PayloadAction<GameEventPayload['winnerDegrees']>) {
            state.rotation = action.payload.degrees;
            state.spinningPercent = action.payload.progress;
            state.isAcceptingBets = false;
            state.isSpinning = true;
        },
    },
});

export default gameSlice;
