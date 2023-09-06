import React, { ReactNode, useEffect } from 'react';
import { Control, FieldValues, Path, PathValue, UseControllerProps, useController } from 'react-hook-form';

export type ControllerConfig<T extends FieldValues = FieldValues> = Omit<UseControllerProps, 'control'> & {
    control: Control<T>;
    name: Path<T>;
    validationValue?: PathValue<T, string & Path<T>>;
};

type Params<T extends FieldValues, K> = ControllerConfig<T> & {
    onChange?: React.ChangeEventHandler;
    onBlur?: React.FocusEventHandler;
};

function useControlledElement<T extends FieldValues, K>(params: Params<T, K>) {
    const { validationValue, onChange, onBlur, ...controllerParams } = params;
    const {
        field,
        fieldState: { error, invalid },
    } = useController(controllerParams as UseControllerProps<T>);

    useEffect(() => {
        if (validationValue !== undefined) {
            field.onChange(validationValue);
        }
    }, [field, validationValue]);

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>, child?: ReactNode) {
        field.onChange(e);
        onChange?.(e);
    }

    function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
        field.onBlur();
        onBlur?.(e);
    }

    return { field, invalid, error, changeHandler, blurHandler };
}

export default useControlledElement;
