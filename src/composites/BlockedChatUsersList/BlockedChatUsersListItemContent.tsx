import styles from './BlockedChatUsersList.module.scss';
import Button from 'components/Button';
import UserCard from 'components/UserCard';
import dayjs from 'dayjs';
import chatMessageStyles from 'components/ChatMessage/ChatMessage.module.scss';
import { ClientChatBanData } from '@backend/models/ChatBan/types';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useState } from 'react';

export type BlockedChatUsersListItemContentProps = {
    data: ClientChatBanData;
    isLoading: boolean;
    onUnban: (data: ClientChatBanData) => MaybePromise<void>;
    onCancel: (data: ClientChatBanData) => MaybePromise<void>;
};

function BlockedChatUsersListItemContent(props: BlockedChatUsersListItemContentProps) {
    const { data } = props;
    const [isUnbanned, setIsUnbanned] = useState(false);

    const unbanHandler = useErrorsHandler(async () => {
        await props.onUnban(data);
        setIsUnbanned(true);
    });

    const cancelHandler = useErrorsHandler(async () => {
        await props.onCancel(data);
        setIsUnbanned(false);
    });

    return (
        <>
            <div className={styles.userInfo}>
                <UserCard
                    name={data.bannedUser.name}
                    avatarSrc={data.bannedUser.avatar}
                    avatarRole={data.bannedUser.role}
                    infoClassName={styles.userInfoText}
                    showNameTooltip
                />
                <div className={chatMessageStyles.controls}>
                    {isUnbanned ? (
                        <Button color="red" className={styles.actionBtn} onClick={cancelHandler} loading={props.isLoading}>
                            Отменить
                        </Button>
                    ) : (
                        <Button className={styles.actionBtn} onClick={unbanHandler} loading={props.isLoading}>
                            Разблокировать
                        </Button>
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.blockInfo}>
                    <p className="bold">
                        {data.bannedUntil === -1 ? (
                            <span className="color-red">Заблокирован навсегда</span>
                        ) : (
                            <span>Заблокирован до {dayjs(data.bannedUntil).format('DD.MM.YYYY HH:mm:ss')}</span>
                        )}
                    </p>
                </div>
                <div className={styles.reason}>
                    <p className="bold">Сообщение:</p>
                    <p className={styles.reasonText}>{data.reason}</p>
                </div>
            </div>
        </>
    );
}

export default BlockedChatUsersListItemContent;
