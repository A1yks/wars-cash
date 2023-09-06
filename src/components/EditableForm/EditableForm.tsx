import EditableContent from '../EditableContent';
import { BaseFormValues, EditableFormProps } from './EditableForm.types';
import useEditableForm from './hooks/useEditableForm';
import styles from './EditableForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import c from 'clsx';

function EditableForm<FormValues extends BaseFormValues>(props: EditableFormProps<FormValues>) {
    const { isInEditMode, renderEditModeContent, enterEditMode, saveHandler, cancelHandler } = useEditableForm(props);

    return (
        <div className={c(styles.editableForm, props.className)}>
            <div className={styles.content}>
                <div className={styles.titleWrapper}>
                    {(!props.hidenTitleInEditMode || !isInEditMode) && <h6 className={styles.title}>{props.title}</h6>}
                    {!isInEditMode && (
                        <div className={styles.editIconWrapper} title={props.tooltip || 'Редактировать'}>
                            <FontAwesomeIcon icon={faEdit} onClick={enterEditMode} className={styles.editIcon} />
                        </div>
                    )}
                </div>
                <EditableContent
                    isSaving={props.isSaving}
                    edit={isInEditMode}
                    editModeContent={renderEditModeContent()}
                    normalContent={props.normalContent}
                    onSave={saveHandler}
                    onCancel={cancelHandler}
                    submitBtnText={props.submitBtnText}
                    cancelBtnText={props.cancelBtnText}
                    className={props.editableContentClassName}
                />
            </div>
        </div>
    );
}

export default EditableForm;
