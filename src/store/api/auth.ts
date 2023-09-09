import { LoginReq } from '@backend/controllers/user/types';
import { IUser } from '@backend/models/User/types';
import { api } from '.';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<API.Response<IUser>, LoginReq>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
