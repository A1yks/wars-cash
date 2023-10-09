import c from 'clsx';
import styles from './HelperText.module.scss';
import { ReactNode } from 'react';

export type HelperTextProps = {
    error?: boolean;
    className?: string;
    children: ReactNode;
};

function HelperText(props: HelperTextProps) {
    if (!props.error) return null;

    return <div className={c(styles.errText, props.className)}>{props.children}</div>;
}

export default HelperText;
