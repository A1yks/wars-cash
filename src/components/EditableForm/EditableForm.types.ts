import { ReactNode } from 'react';
import { Control, DefaultValues, FieldValues } from 'react-hook-form/dist/types';
import { EditableContentProps } from '../EditableContent';
import useFormValidation from 'hooks/useFormValidation';
import { ObjectSchema } from 'yup';

export type BaseFormValues = FieldValues;

type EditModeRenderArgs<FormValues extends BaseFormValues> = { control: Control<FormValues> };

export type FormControls<FormValues extends BaseFormValues> = Omit<ReturnType<typeof useFormValidation<FormValues>>, 'control' | 'submitHandler'>;

type EventCallback<FormValues extends BaseFormValues> = (formControls: FormControls<FormValues>) => MaybePromise<void>;

export type EditableFormProps<FormValues extends BaseFormValues> = Omit<
    EditableContentProps,
    'edit' | 'editModeContent' | 'onSave' | 'onCancel' | 'normalContent' | 'buttonsWrapperClassName'
> & {
    validationSchema: ObjectSchema<FormValues>;
    defaultValidationValues?: DefaultValues<FormValues>;
    title?: string;
    normalContent?: ReactNode;
    editIcon?: JSX.Element;
    renderEditModeContent: (args: EditModeRenderArgs<FormValues>) => ReactNode;
    tooltip?: string;
    editMode?: boolean;
    hidenTitleInEditMode?: boolean;
    persistEditModeOnSave?: boolean;
    editableContentClassName?: string;
    editableContentButtonsWrapperClassName?: string;
    className?: string;
    contentClassName?: string;
    titleWrapperClassName?: string;
    onEdit?: () => void;
    onNormalMode?: () => void;
    onSave: EventCallback<FormValues>;
    onCancel?: EventCallback<FormValues>;
};
