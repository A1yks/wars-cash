import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { IUser } from '@backend/models/User/types';
import { DeleteMessageData, MessageData, ModerationData } from '@backend/services/socket/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'store/api/auth';
import { chatApi } from 'store/api/chat';
import { userApi } from 'store/api/user';

export type ChatState = {
    online: number | null;
    messages: MessageData[];
    blockedUsers: ClientChatBanData[];
    messagesToDisplay: number;
    currentUserId: IUser['_id'] | null;
};

const initialState: ChatState = {
    online: null,
    messages: [],
    blockedUsers: [],
    messagesToDisplay: 100,
    currentUserId: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<MessageData>) {
            if (state.messages.length < state.messagesToDisplay) {
                state.messages.push(action.payload);
            } else {
                state.messages = [...state.messages.slice(1, state.messagesToDisplay), action.payload];
            }
        },
        setOnline(state, action: PayloadAction<ChatState['online']>) {
            state.online = action.payload;
        },
        setCurrentUserId(state, action: PayloadAction<ChatState['currentUserId']>) {
            state.currentUserId = action.payload;
        },
        deleteMessage(state, action: PayloadAction<DeleteMessageData>) {
            state.messages = state.messages.filter((message) => message._id !== action.payload.messageId);
        },
        deleteUserMessages(state, action: PayloadAction<ModerationData>) {
            state.messages = state.messages.filter((message) => message.sender._id !== action.payload.userId);
        },
    },
    extraReducers(builder) {
        return builder
            .addMatcher(authApi.endpoints.auth.matchFulfilled, (state, action) => {
                state.currentUserId = action.payload.data.user._id;
            })
            .addMatcher(authApi.endpoints.getAccessToken.matchFulfilled, (state, action) => {
                state.currentUserId = action.payload.data.user._id;
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.currentUserId = null;
            })
            .addMatcher(chatApi.endpoints.getMessages.matchFulfilled, (state, action) => {
                state.messages = action.payload.data;
            })
            .addMatcher(chatApi.endpoints.getBannedUsers.matchFulfilled, (state, action) => {
                state.blockedUsers = action.payload.data.bannedUsers;
            })
            .addMatcher(userApi.endpoints.changeName.matchFulfilled, (state, action) => {
                state.messages = state.messages.map((message) => {
                    if (message.sender._id === state.currentUserId) {
                        message.sender.name = action.payload.data.name;
                    }

                    return message;
                });
            })
            .addMatcher(userApi.endpoints.changeAvatar.matchFulfilled, (state, action) => {
                state.messages = state.messages.map((message) => {
                    if (message.sender._id === state.currentUserId) {
                        message.sender.avatar = action.payload.data;
                    }

                    return message;
                });
            });
    },
});

export default chatSlice;
