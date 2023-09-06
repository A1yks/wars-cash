import React from 'react';
import useControlledElement from 'hooks/useControlledElement';
import { FieldValues } from 'react-hook-form';
import { ControllerConfig } from 'hooks/useControlledElement';
import Input, { InputProps } from 'components/Input';
import styles from './ControlledInput.module.scss';

export type ControlledInputProps<T extends FieldValues = FieldValues> = Omit<InputProps, 'name'> & ControllerConfig<T>;

function ControlledInput<T extends FieldValues = FieldValues>(props: ControlledInputProps<T>, ref: React.ForwardedRef<HTMLInputElement>) {
    const { control, name, rules, defaultValue, value, shouldUnregister, validationValue, onBlur, onChange, ...restProps } = props;
    const { error, field, invalid, changeHandler, blurHandler } = useControlledElement({
        control,
        name,
        rules,
        defaultValue,
        shouldUnregister,
        validationValue,
        onChange,
        onBlur,
    });

    const isError = invalid;
    const errText = error?.message;

    return (
        <div className={styles.input} ref={ref}>
            <Input {...restProps} ref={field.ref} onChange={changeHandler} onBlur={blurHandler} value={value} name={field.name} />
            {isError && <div className={styles.errText}>{errText}</div>}
        </div>
    );
}

const ForwardedControlledInput = React.forwardRef(ControlledInput);

export default React.memo(ForwardedControlledInput) as typeof ControlledInput;
