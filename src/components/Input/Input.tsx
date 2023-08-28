import React from 'react';
import c from 'clsx';
import styles from './Input.module.scss';

export type InputProps = {
    className?: string;
} & React.ComponentPropsWithRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, ...inputProps } = props;

    return <input ref={ref} className={c(styles.input, className)} {...inputProps} />;
});

Input.displayName = 'Input';

export default Input;
