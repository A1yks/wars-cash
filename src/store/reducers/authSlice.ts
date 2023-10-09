import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'store/api/auth';
import userSlice from './userSlice';
import { checkAuth } from 'facebook/auth';

export type AuthState = {
    token: string | null;
    isLoading: boolean;
    isLoginCompleted: boolean;
};

const initialState: AuthState = {
    token: null,
    isLoading: false,
    isLoginCompleted: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            return action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setIsLoginCompleted(state, action: PayloadAction<boolean>) {
            state.isLoginCompleted = action.payload;
        },
    },
    extraReducers(builder) {
        return builder
            .addMatcher(authApi.endpoints.auth.matchFulfilled, (state, action) => {
                state.token = action.payload.data.accessToken;
                state.isLoading = false;
                state.isLoginCompleted = true;
            })
            .addMatcher(authApi.endpoints.getAccessToken.matchFulfilled, (state, action) => {
                state.token = action.payload.data.accessToken;
            });
    },
});

export default authSlice;
