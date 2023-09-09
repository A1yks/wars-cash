import { IUser } from '@backend/models/User/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'store/api/auth';

export type UserState = {
    user: IUser | null;
    token: string | null;
    isLoading: boolean;
    isLoginCompleted: boolean;
};

const initialState: UserState = {
    user: null,
    token: null,
    isLoading: false,
    isLoginCompleted: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setIsLoginCompleted(state, action: PayloadAction<boolean>) {
            state.isLoginCompleted = action.payload;
        },
    },
    extraReducers(builder) {
        return builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isLoading = false;
            state.isLoginCompleted = true;
        });
    },
});

export default authSlice;
