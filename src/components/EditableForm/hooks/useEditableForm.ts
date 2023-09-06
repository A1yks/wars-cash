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
            }
        },
        {
            defaultValues: props.defaultValidationValues,
        }
    );

    async function cancelHandler() {
        await props.onCancel?.(formControls);
        exitEditMode();
    }

    const renderEditModeContent = () => props.renderEditModeContent({ control });

    return { control, isInEditMode, renderEditModeContent, enterEditMode, saveHandler, cancelHandler };
}

export default useEditableForm;
