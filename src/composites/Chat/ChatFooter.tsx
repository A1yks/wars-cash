import ControlledInput from 'components/ControlledInput';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner/Spinner';
import { ChatProps } from './Chat';
import styles from './Chat.module.scss';
import SimpleBar from 'simplebar-react';
import { RefObject, ComponentRef, memo } from 'react';
import useChatFooter from './hooks/useChatFooter';
import c from 'clsx';
import Image from 'next/image';

export type ChatFooterProps = Pick<ChatProps, 'isLoggedIn' | 'onSubmit'> & {
    timeToUnban: number;
    scrollRef: RefObject<ComponentRef<typeof SimpleBar>>;
    scrollToBottom: (behavior: ScrollBehavior) => void;
};

function ChatFooter(props: ChatFooterProps) {
    const { control, message, isSubmitting, changeMessageHandler, submitHandler } = useChatFooter(props);

    if (!props.isLoggedIn || props.timeToUnban > 0) {
        return (
            <div className={c(styles.authRequired, 'flex', 'center')}>
                <Image src="/images/lock.png" width={18} height={21} alt="" />
                <span>
                    {!props.isLoggedIn
                        ? 'Необходима авторизация'
                        : props.timeToUnban === Infinity
                        ? 'Вы заблокированы навсегда'
                        : `Вы заблокированы на ${props.timeToUnban} с.`}
                </span>
            </div>
        );
    }

    return (
        <form onSubmit={submitHandler} className={styles.sendMsg}>
            <ControlledInput
                control={control}
                name="message"
                type="text"
                className={styles.input}
                errLabelClassName={styles.msgErrLabel}
                placeholder="Введите сообщение"
                value={message}
                onChange={changeMessageHandler}
                autoComplete="off"
                inputMode="numeric"
            />
            <button type="submit" className={c(styles.iconBtn, styles.sendIconBtn)} disabled={isSubmitting}>
                {isSubmitting ? (
                    <Spinner size={24} className={styles.submitSpinner} />
                ) : (
                    <Icon src="/images/send.svg" width="2.6rem" height="2.6rem" />
                )}
            </button>
        </form>
    );
}

export default memo(ChatFooter);
