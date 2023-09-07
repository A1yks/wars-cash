import c from 'clsx';
import styles from './ConfirmationDialog.module.scss';
import { Modal, ModalCloser, useModal } from 'components/Modal';
import AppModalBody from 'components/AppModalBody';
import Button from 'components/Button';
import { ReactNode, useState } from 'react';
import useErrorsHandler from 'hooks/useErrorsHandler';

export type ConfirmationDialogProps = {
    onCancel?: () => void;
    onSubmit: () => MaybePromise<void>;
    title?: string;
    content?: ReactNode;
    children?: ReactNode;
    cancelBtnText?: string;
    submitBtnText?: string;
};

function ConfirmationDialogBody(props: ConfirmationDialogProps) {
    const { cancelBtnText = 'Отмена', submitBtnText = 'Да' } = props;
    const { close } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitHandler = useErrorsHandler(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        await props.onSubmit();
        setIsSubmitting(false);
        close();
    });

    return (
        <form className={styles.dialog} onSubmit={submitHandler}>
            {props.content !== undefined && <div className={styles.content}>{props.content}</div>}
            <div className={styles.actions}>
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting} className={styles.submitBtn}>
                    {submitBtnText}
                </Button>
                <ModalCloser>
                    <Button color="red" onClick={props.onCancel} disabled={isSubmitting}>
                        {cancelBtnText}
                    </Button>
                </ModalCloser>
            </div>
        </form>
    );
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
    const { title = 'Подтвердите действие' } = props;

    return (
        <Modal>
            <AppModalBody title={title}>
                <ConfirmationDialogBody {...props} />
            </AppModalBody>
            {props.children}
        </Modal>
    );
}

export default ConfirmationDialog;
