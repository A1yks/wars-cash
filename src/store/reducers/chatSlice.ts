import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { DeleteMessageData, MessageData, ModerationData } from '@backend/services/socket/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { chatApi } from 'store/api/chat';

export type ChatState = {
    online: number | null;
    messages: MessageData[];
    blockedUsers: ClientChatBanData[];
    messagesToDisplay: number;
};

const initialState: ChatState = {
    online: null,
    messages: [],
    blockedUsers: [],
    messagesToDisplay: 100,
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
        deleteMessage(state, action: PayloadAction<DeleteMessageData>) {
            state.messages = state.messages.filter((message) => message._id !== action.payload.messageId);
        },
        deleteUserMessages(state, action: PayloadAction<ModerationData>) {
            state.messages = state.messages.filter((message) => message.sender._id !== action.payload.userId);
        },
    },
    extraReducers(builder) {
        return builder
            .addMatcher(chatApi.endpoints.getMessages.matchFulfilled, (state, action) => {
                state.messages = action.payload.data;
            })
            .addMatcher(chatApi.endpoints.getBannedUsers.matchFulfilled, (state, action) => {
                state.blockedUsers = action.payload.data.bannedUsers;
            });
    },
});

export default chatSlice;
