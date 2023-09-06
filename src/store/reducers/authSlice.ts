import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'types/global';

export type UserState = {
    user: User | null;
    token: string | null;
};

const initialState: UserState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
    },
});

export default authSlice;
