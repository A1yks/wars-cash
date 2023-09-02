import c from 'clsx';
import styles from './ChatMessage.module.scss';
import { User } from 'types/global';
import Avatar from 'components/Avatar';

export type ChatMessageProps = {
    user: User;
    children: string; // message itself
    className?: string;
};

function ChatMessage(props: ChatMessageProps) {
    const { user, children, className } = props;
    const fullName = `${user.name} ${user.surname}`;

    return (
        <div className={c(styles.message, className)}>
            <Avatar src={user.avatar} role={user.role} />
            <div className={styles.content}>
                <div className={styles.info}>{fullName}</div>
                <div className={styles.text}>{children}</div>
            </div>
        </div>
    );
}

export default ChatMessage;
