import { PublicUserData, Roles } from '@backend/models/User/types';
import { api } from '.';
import { ChangeBalanceReq, ChangeRoleReq, GetUsersReq, RestrictAccessReq } from '@backend/controllers/user/types';
import { GetUsersRes } from './types';

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
        getUsers: build.query<API.Response<GetUsersRes>, GetUsersReq>({
            query: (data) => ({
                url: '/user',
                params: data,
            }),
        }),
        changeBalance: build.mutation<API.Response<number>, ChangeBalanceReq>({
            query: (data) => ({
                url: '/user/change/balance',
                method: 'PATCH',
                body: data,
            }),
        }),
        restrictAccess: build.mutation<API.Response<void>, RestrictAccessReq>({
            query: (data) => ({
                url: '/user/restrict',
                method: 'PATCH',
                body: data,
            }),
        }),
        changeRole: build.mutation<API.Response<Roles>, ChangeRoleReq>({
            query: (data) => ({
                url: '/user/change/role',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useChangeNameMutation,
    useChangeAvatarMutation,
    useGetUsersQuery,
    useChangeBalanceMutation,
    useRestrictAccessMutation,
    useLazyGetUsersQuery,
    useChangeRoleMutation,
} = userApi;
