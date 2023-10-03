import c from 'clsx';
import styles from './Chat.module.scss';
import UserList from 'components/UserList';
import UserListItem from 'components/UserListItem';
import { ChatProps } from './Chat';
import { ComponentRef, RefObject, memo } from 'react';
import { compareRoles } from '@backend/models/User/types';
import ChatMessage from 'components/ChatMessage';
import SimpleBar from 'simplebar-react';

export type ChatBodyProps = Pick<ChatProps, 'messages' | 'userRole' | 'onDeleteMessage' | 'onRestrictChatAccess'> & {
    className?: string;
    scrollClassName?: string;
    scrollRef: RefObject<ComponentRef<typeof SimpleBar>>;
};

function ChatBody(props: ChatBodyProps) {
    return (
        <SimpleBar className={c(styles.scrollbar, props.scrollClassName)} autoHide={false} ref={props.scrollRef}>
            <UserList className={c(styles.messages, props.className)}>
                {props.messages.map((message) => (
                    <UserListItem key={message._id.toString()} variant="custom">
                        <ChatMessage
                            message={message}
                            showModerationControls={compareRoles(props.userRole, message.sender.role)}
                            onDeleteMessage={props.onDeleteMessage}
                            onRestrictChatAccess={props.onRestrictChatAccess}
                        />
                    </UserListItem>
                ))}
            </UserList>
        </SimpleBar>
    );
}

export default memo(ChatBody);
