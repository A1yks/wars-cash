import { ClientUser } from '@backend/models/User/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'store/api/auth';
import { betsApi } from 'store/api/bet';

export type UserState = ClientUser | null;

const initialState = null as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return action.payload;
        },
        setBalance(state, action: PayloadAction<number>) {
            if (state !== null) {
                state.balance = action.payload;
            }
        },
    },
    extraReducers(builder) {
        function checkUser<T>(callback: (state: NonNullable<UserState>, action: T) => typeof state | void) {
            return (state: UserState, action: T) => {
                if (state !== null) {
                    return callback(state as NonNullable<UserState>, action);
                }
            };
        }

        return builder
            .addMatcher(authApi.endpoints.auth.matchFulfilled, (state, action) => {
                return action.payload.data.user;
            })
            .addMatcher(authApi.endpoints.getAccessToken.matchFulfilled, (state, action) => {
                return action.payload.data.user;
            })
            .addMatcher(
                betsApi.endpoints.placeBet.matchFulfilled,
                checkUser((state, action) => {
                    state.balance = action.payload.data;
                })
            );
    },
});

export default userSlice;
