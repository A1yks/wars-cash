import c from 'clsx';
import styles from './Button.module.scss';
import { Colors } from 'types/global';
import { ReactNode } from 'react';

export type ButtonProps = {
    variant?: 'normal' | 'round' | 'text';
    color?: Colors;
    children?: ReactNode;
    className?: string;
};

function Button(props: ButtonProps) {
    const { variant = 'normal', color = 'blue', children, className } = props;

    return <button className={c(styles.btn, styles[variant], styles[color], 'flex', 'center', className)}>{children}</button>;
}

export default Button;
