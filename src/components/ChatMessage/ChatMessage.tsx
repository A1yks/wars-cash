import c from 'clsx';
import styles from './ChatMessage.module.scss';
import Avatar from 'components/Avatar';
import { PublicUserData } from '@backend/models/User/types';

export type ChatMessageProps = {
    user: PublicUserData;
    children: string; // message itself
    className?: string;
};

function ChatMessage(props: ChatMessageProps) {
    const { user, children, className } = props;

    return (
        <div className={c(styles.message, className)}>
            <Avatar src={user.avatar} role={user.role} />
            <div className={styles.content}>
                <div className={styles.info}>{user.name}</div>
                <div className={styles.text}>{children}</div>
            </div>
        </div>
    );
}

export default ChatMessage;
