import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { IUser, Roles, moderRoles } from '@backend/models/User/types';
import { MessageData, ModerationData } from '@backend/services/socket/types';
import { createSelector } from '@reduxjs/toolkit';
import { BLOCKED_USERS_PER_PAGE } from 'composites/BlockedChatUsersList/BlockedChatUsersList';
import Chat from 'composites/Chat';
import useAppSelector from 'hooks/useAppSelector';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'store';
import {
    useDeleteMessageMutation,
    useGetBannedUsersQuery,
    useGetMessagesQuery,
    useLazyGetBannedUsersQuery,
    useModerateMutation,
    useSaveMessageMutation,
} from 'store/api/chat';
import { chatDataSelector, userSelector, authDataSelector } from 'store/selectors';
import { extractError } from 'utils/extractError';
import getTimeLeft from 'utils/getTimeLeft';

const selector = createSelector([chatDataSelector, userSelector, authDataSelector], (chat, user, auth) => ({
    ...chat,
    user,
    isLoggedIn: auth.token !== null,
}));

function ChatContainer() {
    const { isLoggedIn, user, online, messages, blockedUsers } = useAppSelector(selector);
    const { isLoading: isLoadingMessages, isError: isGettingMessagesError, error: messagesError } = useGetMessagesQuery();
    const [saveMessageMutation, { isLoading: isSavingMessage }] = useSaveMessageMutation();
    const [deleteMessageMutation] = useDeleteMessageMutation();
    const [moderationMutation, { isLoading: isPerformingModerationAction }] = useModerateMutation();
    const [triggerGetBannedUsers, { isFetching: isGettingBannedUsers, data: bannedUsersResponse }] = useLazyGetBannedUsersQuery();
    const blockedUsersOffsetRef = useRef(0);
    const blockedUsersSearchValueRef = useRef<string | undefined>(undefined);
    const totalBlockedUsers = bannedUsersResponse?.data.total || 0;

    useEffect(() => {
        if (user?.role !== undefined && moderRoles.includes(user.role)) {
            triggerGetBannedUsers({ limit: BLOCKED_USERS_PER_PAGE, offset: 0 }, false);
        }
    }, [triggerGetBannedUsers, user?.role]);

    const saveMessage = useCallback(
        async (message: string) => {
            if (user === null) {
                throw new Error('Вы не авторизованы');
            }

            await saveMessageMutation({
                sender: {
                    _id: user._id.toString(),
                    avatar: user.avatar,
                    name: user.name,
                    role: user.role,
                },
                text: message,
            }).unwrap();
        },
        [saveMessageMutation, user]
    );

    const deleteMessage = useCallback(
        async (message: MessageData) => {
            await deleteMessageMutation({ messageId: message._id.toString() }).unwrap();
        },
        [deleteMessageMutation]
    );

    const restrictChatAccess = useCallback(
        async (data: ModerationData) => {
            if (data.period !== undefined) {
                await moderationMutation({
                    userId: data.userId.toString(),
                    period: data.period,
                    reason: data.reason || '',
                }).unwrap();
            }
        },
        [moderationMutation]
    );

    const blockedUsersPageOpenHandler = useCallback(() => {
        triggerGetBannedUsers({ limit: BLOCKED_USERS_PER_PAGE, offset: 0 }, false);
    }, [triggerGetBannedUsers]);

    const blockedUsersPageCloseHandler = useCallback(() => {
        blockedUsersOffsetRef.current = 0;
        blockedUsersSearchValueRef.current = undefined;
    }, []);

    const blockedUsersPageChangeHandler = useCallback(
        async ({ selected }: { selected: number }) => {
            const offset = selected * BLOCKED_USERS_PER_PAGE;

            blockedUsersOffsetRef.current = offset;

            await triggerGetBannedUsers({ limit: BLOCKED_USERS_PER_PAGE, offset, filter: blockedUsersSearchValueRef.current }, false).unwrap();
        },
        [triggerGetBannedUsers]
    );

    const unbanHandler = useCallback(
        ({ bannedUser, reason }: ClientChatBanData) => restrictChatAccess({ userId: bannedUser._id, period: 0, reason }),
        [restrictChatAccess]
    );

    const cancelUnbanHandler = useCallback(
        ({ bannedUser, bannedUntil, reason }: ClientChatBanData) =>
            restrictChatAccess({ userId: bannedUser._id, period: bannedUntil === -1 ? -1 : Math.floor(getTimeLeft(bannedUntil) / 1000), reason }),
        [restrictChatAccess]
    );

    const blockedUsersSearchHandler = useErrorsHandler(async (value: string) => {
        console.trace();
        blockedUsersSearchValueRef.current = value;
        await triggerGetBannedUsers({ limit: BLOCKED_USERS_PER_PAGE, offset: 0, filter: value }, false).unwrap();
    });

    return (
        <Chat
            online={online}
            isLoggedIn={isLoggedIn}
            userRole={user?.role ?? Roles.User}
            isLoadingMessages={isLoadingMessages}
            errorText={extractError(messagesError)}
            messages={messages}
            onSubmit={saveMessage}
            chatTimeout={user?.chatTimeout ?? -1}
            onDeleteMessage={deleteMessage}
            onRestrictChatAccess={restrictChatAccess}
            blockedUsers={blockedUsers}
            totalBlockedUsers={totalBlockedUsers}
            blockedUsersLoading={isGettingBannedUsers}
            blockedUsersPerformingAction={isPerformingModerationAction}
            onBlockedUsersListOpen={blockedUsersPageOpenHandler}
            onBlockedUsersListClosed={blockedUsersPageCloseHandler}
            onBlockedUsersPageChange={blockedUsersPageChangeHandler}
            onBlockedUsersSearch={blockedUsersSearchHandler}
            onUnban={unbanHandler}
            onCancelUnban={cancelUnbanHandler}
        />
    );
}

export default ChatContainer;
