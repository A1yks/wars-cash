import c from 'clsx';
import styles from './Button.module.scss';
import { ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import React from 'react';
import Spinner from 'components/Spinner/Spinner';

export type ButtonProps = {
    variant?: 'normal' | 'round' | 'text';
    color?: 'red' | 'blue' | 'black' | 'dark-gray';
    children?: ReactNode;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { variant = 'normal', color = 'blue', loading, disabled, children, className, ...btnProps } = props;
    const [btnHeight, setBtnHeight] = useState(38);
    const [btnWidth, setBtnWidth] = useState(0);
    const [isMeasuresSaved, setIsMeasuresSaved] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const height = isMeasuresSaved ? btnHeight : undefined;
    const width = isMeasuresSaved ? btnWidth : undefined;

    useImperativeHandle(ref, () => btnRef.current!);

    useEffect(() => {
        if (btnRef.current !== null && !isMeasuresSaved) {
            setBtnHeight(btnRef.current.offsetHeight);
            setBtnWidth(btnRef.current.offsetWidth);
            setIsMeasuresSaved(true);
        }
    }, [isMeasuresSaved]);

    return (
        <button
            ref={btnRef}
            disabled={disabled || loading}
            style={{ height, width }}
            className={c(styles.btn, styles[variant], styles[color], 'flex', 'center', className)}
            type="button"
            {...btnProps}
        >
            {loading ? <Spinner color="#fff" size={btnHeight * 0.5} /> : children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
