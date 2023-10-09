import c from 'clsx';
import styles from './Chat.module.scss';
import Block from 'composites/Block';
import Image from 'next/image';
import useChat from './hooks/useChat';
import { memo } from 'react';
import { MessageData, ModerationData } from '@backend/services/socket/types';
import Spinner from 'components/Spinner/Spinner';
import ChatBody from './ChatBody';
import { IUser, Roles } from '@backend/models/User/types';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { ClientChatBanData } from '@backend/models/ChatBan/types';
import { BlockedChatUsersListProps } from 'composites/BlockedChatUsersList/BlockedChatUsersList';

const BlockedChatUsersList = dynamic(() => import('composites/BlockedChatUsersList'), {
    ssr: false,
    loading: () => (
        <div className={c(styles.scrollbar)}>
            <Spinner />
        </div>
    ),
});
const ChatFooter = dynamic(() => import('./ChatFooter'), { ssr: false });

export type ChatProps = {
    className?: string;
    online: number | null;
    messages: MessageData[];
    isLoggedIn: boolean;
    userRole: Roles;
    isLoadingMessages?: boolean;
    errorText?: string;
    chatTimeout: IUser['chatTimeout'];
    onSubmit: (message: string) => MaybePromise<void>;
    blockedUsers: ClientChatBanData[];
    blockedUsersLoading: boolean;
    blockedUsersPerformingAction: boolean;
    totalBlockedUsers: number;
    onBlockedUsersListOpen: () => MaybePromise<void>;
    onBlockedUsersListClosed: () => MaybePromise<void>;
    onDeleteMessage: (message: MessageData) => MaybePromise<void>;
    onRestrictChatAccess: (data: ModerationData) => MaybePromise<void>;
    onBlockedUsersPageChange: BlockedChatUsersListProps['onPageChange'];
    onBlockedUsersSearch: BlockedChatUsersListProps['onSearch'];
    onUnban: BlockedChatUsersListProps['onUnban'];
    onCancelUnban: BlockedChatUsersListProps['onCancel'];
};

const image = <Image src="/images/chat.png" width={56} height={58} alt="" className={styles.img} />;

function Chat(props: ChatProps) {
    const { isLoggedIn, blockedUsers = [] } = props;
    const {
        scrollRef,
        timeToUnban,
        isMuted,
        isBlockedUsersListOpened,
        isFooterVisible,
        showModerControls,
        scrollClickHandler,
        scrollToBottom,
        toggleBlockedUsersList,
    } = useChat(props);
    const blockedUsersIconTitle = isBlockedUsersListOpened
        ? 'Закрыть список заблокированных пользователей'
        : 'Открыть список заблокированных пользователей';
    const scrollClassName = c({ [styles.loggedIn]: isLoggedIn && !isMuted && isFooterVisible });

    return (
        <Block title="Чат" rightContent={image} className={c(styles.chat, props.className)}>
            <div className={styles.status}>
                <div className={styles.inChat}>
                    В чате: {props.online === null ? <Spinner className={styles.onlineLoadingSpinner} size="small" /> : props.online}
                </div>
                <div className={styles.buttons}>
                    {showModerControls && (
                        <div
                            className={c(styles.iconBtn, { [styles.iconActive]: isBlockedUsersListOpened })}
                            title={blockedUsersIconTitle}
                            onClick={toggleBlockedUsersList}
                        >
                            <FontAwesomeIcon icon={faUser} fontSize="1.2rem" />
                        </div>
                    )}
                    <div className={styles.iconBtn} onClick={scrollClickHandler} title="Прокрутить чат вниз">
                        <FontAwesomeIcon icon={faArrowDown} fontSize="1.6rem" />
                    </div>
                </div>
            </div>
            {props.isLoadingMessages ? (
                <div className={styles.messages}>
                    <Spinner />
                </div>
            ) : props.messages.length === 0 || props.errorText ? (
                <div className={c(styles.messages, 'flex', 'center', { [styles.loggedIn]: isLoggedIn })}>
                    <span className={styles.infoText}>Сообщений нет</span>
                </div>
            ) : isBlockedUsersListOpened ? (
                <BlockedChatUsersList
                    scrollRef={scrollRef}
                    blockedUsers={blockedUsers}
                    totalBlockedUsers={props.totalBlockedUsers}
                    isLoadingUsers={props.blockedUsersLoading}
                    isPermormingAction={props.blockedUsersPerformingAction}
                    onPageChange={props.onBlockedUsersPageChange}
                    onUnban={props.onUnban}
                    onCancel={props.onCancelUnban}
                    onSearch={props.onBlockedUsersSearch}
                />
            ) : (
                <ChatBody
                    scrollRef={scrollRef}
                    messages={props.messages}
                    className={scrollClassName}
                    scrollClassName={scrollClassName}
                    userRole={props.userRole}
                    onDeleteMessage={props.onDeleteMessage}
                    onRestrictChatAccess={props.onRestrictChatAccess}
                />
            )}
            {isFooterVisible && (
                <ChatFooter
                    isLoggedIn={props.isLoggedIn}
                    timeToUnban={timeToUnban}
                    onSubmit={props.onSubmit}
                    scrollRef={scrollRef}
                    scrollToBottom={scrollToBottom}
                />
            )}
        </Block>
    );
}

export default memo(Chat);
