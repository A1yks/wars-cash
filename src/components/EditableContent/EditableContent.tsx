import Button from 'components/Button';
import { ReactNode } from 'react';
import styles from './EditableContent.module.scss';
import c from 'clsx';

export type EditableContentProps = {
    edit: boolean;
    editModeContent: ReactNode;
    normalContent: ReactNode;
    isSaving?: boolean;
    submitBtnText?: string;
    cancelBtnText?: string;
    className?: string;
    buttonsWrapperClassName?: string;
    editModeContentClassName?: string;
    onSave: () => MaybePromise<void>;
    onCancel?: () => MaybePromise<void>;
};

function EditableContent(props: EditableContentProps) {
    const { submitBtnText = 'Сохранить', cancelBtnText = 'Отменить' } = props;

    return (
        <form onSubmit={props.onSave} className={c(styles.form, props.className)}>
            {props.edit ? (
                <>
                    <div className={props.editModeContentClassName}>{props.editModeContent}</div>
                    <div className={c(styles.buttons, props.buttonsWrapperClassName)}>
                        <Button type="submit" loading={props.isSaving} disabled={props.isSaving} className={styles.button}>
                            {submitBtnText}
                        </Button>

                        <Button color="red" onClick={props.onCancel} disabled={props.isSaving} className={styles.button}>
                            {cancelBtnText}
                        </Button>
                    </div>
                </>
            ) : (
                <div>{props.normalContent}</div>
            )}
        </form>
    );
}

export default EditableContent;
