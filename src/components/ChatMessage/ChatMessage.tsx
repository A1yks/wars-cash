import c from 'clsx';
import styles from './ChatMessage.module.scss';
import Avatar from 'components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import ControlledInput from 'components/ControlledInput';
import { object, string } from 'yup';
import EditableForm from 'components/EditableForm';
import useChatMessage from './hooks/useChatMessage';
import { MessageData } from '@backend/services/socket/types';
import { ChatProps } from 'composites/Chat/Chat';

export type ChatMessageProps = Pick<ChatProps, 'onDeleteMessage' | 'onRestrictChatAccess'> & {
    className?: string;
    showModerationControls?: boolean;
    message: MessageData;
};

const timeoutSchema = object({ time: string().integer().required() });

function ChatMessage(props: ChatMessageProps) {
    const { message, showModerationControls, className } = props;
    const {
        formState,
        isTimingOut,
        isTimeoutInputVisible,
        changeHandler,
        showTimeoutInput,
        hideTimeoutInput,
        getTimeoutFormState,
        timeoutHadler,
        banHandler,
        deleteMessageHandler,
    } = useChatMessage(props);

    return (
        <div className={c(styles.message, className)}>
            <Avatar src={message.sender.avatar} role={message.sender.role} />
            <div className={styles.content}>
                <div className={styles.info} title={message.sender.name}>
                    {message.sender.name}
                </div>
                <div className={styles.text}>{message.text}</div>
            </div>
            {showModerationControls && (
                <div className={styles.controls}>
                    {!isTimeoutInputVisible && (
                        <FontAwesomeIcon icon={faTrashCan} className={styles.icon} title="Удалить сообщение" onClick={deleteMessageHandler} />
                    )}
                    <EditableForm
                        className={styles.editableForm}
                        editableContentClassName={styles.editableContent}
                        editableContentButtonsWrapperClassName={styles.buttonsWrapper}
                        isSaving={isTimingOut}
                        validationSchema={timeoutSchema}
                        tooltip="Заблокировать на время"
                        editIcon={<FontAwesomeIcon icon={faClock} className={styles.icon} onClick={showTimeoutInput} />}
                        renderEditModeContent={({ control }) => (
                            <ControlledInput
                                name="time"
                                control={control}
                                placeholder="Время"
                                value={formState.time}
                                onChange={changeHandler('time')}
                                autoFocus
                                className={styles.timeoutInput}
                                autoComplete="off"
                            />
                        )}
                        defaultValidationValues={getTimeoutFormState()}
                        submitBtnText="Ок"
                        cancelBtnText="Отмена"
                        onEdit={showTimeoutInput}
                        onNormalMode={hideTimeoutInput}
                        onSave={timeoutHadler}
                    />
                    {!isTimeoutInputVisible && (
                        <FontAwesomeIcon icon={faBan} className={styles.icon} title=" Заблокировать навсегда" onClick={banHandler} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatMessage;
