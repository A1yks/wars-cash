import { IBonus } from '@backend/models/Bonus/types';
import { createSlice } from '@reduxjs/toolkit';
import { bonusApi } from 'store/api/bonus';

type BonusState = Pick<IBonus, 'availabilityTime'>;

const initialState: BonusState = {
    availabilityTime: Date.now() + 24 * 60 * 60 * 1000 * 30,
};

const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {},
    extraReducers(builder) {
        return builder
            .addMatcher(bonusApi.endpoints.getBonusInfo.matchFulfilled, (state, action) => {
                state.availabilityTime = action.payload.data.availabilityTime;
            })
            .addMatcher(bonusApi.endpoints.claimBonus.matchFulfilled, (state, action) => {
                state.availabilityTime = action.payload.data.bonusInfo.availabilityTime;
            });
    },
});

export default bonusSlice;
