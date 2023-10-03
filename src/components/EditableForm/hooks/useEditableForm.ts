import useBooleanState from 'hooks/useBooleanState';
import useFormValidation from 'hooks/useFormValidation';
import { BaseFormValues, EditableFormProps } from '../EditableForm.types';

function useEditableForm<FormValues extends BaseFormValues>(props: EditableFormProps<FormValues>) {
    const [isInEditMode, enterEditMode, exitEditMode] = useBooleanState(props.editMode);

    const {
        control,
        submitHandler: saveHandler,
        ...formControls
    } = useFormValidation<FormValues>(
        props.validationSchema,
        async () => {
            await props.onSave(formControls);

            if (!props.persistEditModeOnSave) {
                exitEditMode();
                props.onNormalMode?.();
            }
        },
        {
            defaultValues: props.defaultValidationValues,
        }
    );

    async function cancelHandler() {
        props.onNormalMode?.();
        await props.onCancel?.(formControls);
        exitEditMode();
    }

    function enterEditModeHandler() {
        props.onEdit?.();
        enterEditMode();
    }

    const renderEditModeContent = () => props.renderEditModeContent({ control });

    return { control, isInEditMode, renderEditModeContent, enterEditMode: enterEditModeHandler, saveHandler, cancelHandler };
}

export default useEditableForm;
