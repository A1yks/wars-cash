import { PublicUserData } from '@backend/models/User/types';
import { api } from '.';

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        changeName: build.mutation<API.Response<PublicUserData>, string>({
            query: (name) => ({
                url: '/user/change/name',
                method: 'PATCH',
                body: { name },
            }),
        }),
        changeAvatar: build.mutation<API.Response<string>, FormData>({
            query: (data) => ({
                url: '/user/change/avatar',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useChangeNameMutation, useChangeAvatarMutation } = userApi;
