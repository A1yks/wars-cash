import c from 'clsx';
import styles from './Chat.module.scss';
import Block from 'composites/Block';
import Image from 'next/image';
import UserList from 'components/UserList';
import { Message } from 'types/global';
import UserListItem from 'components/UserListItem';
import SimpleBar from 'simplebar-react';
import Icon from 'components/Icon/Icon';
import useChat from './hooks/useChat';
import { memo } from 'react';

export type ChatProps = {
    className?: string;
    inChat: number;
    messages: Message[];
    isLoggedIn: boolean;
};

// TODO add buttons
function Chat(props: ChatProps) {
    const { isLoggedIn } = props;
    const { scrollRef, scrollClickHandler } = useChat();

    return (
        <Block
            title="Чат"
            rightContent={<Image src="/images/chat.png" width={56} height={58} alt="" className={styles.img} />}
            className={c(styles.chat, props.className)}
        >
            <div className={styles.status}>
                <div className={styles.inChat}>В чате: {props.inChat}</div>
                <div className={styles.buttons}>
                    <Icon src="/images/down.png" className={styles.iconBtn} width="2.6rem" height="2.6rem" onClick={scrollClickHandler} />
                </div>
            </div>
            <SimpleBar className={c(styles.scrollbar, { [styles.loggedIn]: isLoggedIn })} autoHide={false} ref={scrollRef}>
                <UserList className={c(styles.messages, { [styles.loggedIn]: isLoggedIn })}>
                    {props.messages.map((message) => (
                        <UserListItem key={message._id.toString()} variant="message" user={message.sender}>
                            {message.text}
                        </UserListItem>
                    ))}
                </UserList>
            </SimpleBar>
            {isLoggedIn ? (
                <div className={styles.sendMsg}>
                    <input type="text" className={styles.input} placeholder="Введите сообщение" />
                    <Icon src="/images/send.svg" className={styles.iconBtn} width="2.6rem" height="2.6rem" />
                </div>
            ) : (
                <div className={c(styles.authRequired, 'flex', 'center')}>
                    <Image src="/images/lock.png" width={18} height={21} alt="" />
                    <span>Необходима авторизация</span>
                </div>
            )}
        </Block>
    );
}

export default memo(Chat);
