import { UserAdminInfo } from '@backend/services/user/types';
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from 'store/api/user';

export type UsersInfoState = {
    users: UserAdminInfo[];
    total: number;
};

const initialState: UsersInfoState = {
    users: [],
    total: 0,
};

const usersInfoSlice = createSlice({
    name: 'usersInfo',
    initialState,
    reducers: {},
    extraReducers(builder) {
        return builder
            .addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
                return action.payload.data;
            })
            .addMatcher(userApi.endpoints.changeBalance.matchFulfilled, (state, action) => {
                state.users = state.users.map((user) =>
                    user._id === action.meta.arg.originalArgs.userId ? { ...user, balance: action.payload.data } : user
                );
            });
    },
});

export default usersInfoSlice;
