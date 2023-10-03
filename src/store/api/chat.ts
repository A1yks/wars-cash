import { DeleteMessageReq, GetBannesUsersReq, ModerationReq, SaveMessageReq } from '@backend/controllers/chat/types';
import { api } from '.';
import { PopulatedMessage } from '@backend/models/ChatMessage/types';
import { IUser } from '@backend/models/User/types';
import { GetBannesUsersRes } from './types';

export const chatApi = api.injectEndpoints({
    endpoints: (build) => ({
        saveMessage: build.mutation<void, SaveMessageReq>({
            query: (message) => ({
                url: '/chat/save',
                method: 'POST',
                body: message,
            }),
        }),
        getMessages: build.query<API.Response<PopulatedMessage[]>, void>({
            query: () => '/chat',
        }),
        deleteMessage: build.mutation<void, DeleteMessageReq>({
            query: (data) => ({
                url: '/chat/messages/delete',
                method: 'DELETE',
                body: data,
            }),
        }),
        moderate: build.mutation<API.Response<IUser>, ModerationReq>({
            query: (data) => ({
                url: '/chat/moderate',
                method: 'PATCH',
                body: data,
            }),
        }),
        getBannedUsers: build.query<API.Response<GetBannesUsersRes>, GetBannesUsersReq>({
            query: (params) => ({
                url: '/chat/users/banned',
                params,
            }),
        }),
    }),
});

export const {
    useSaveMessageMutation,
    useGetMessagesQuery,
    useDeleteMessageMutation,
    useModerateMutation,
    useGetBannedUsersQuery,
    useLazyGetBannedUsersQuery,
} = chatApi;
