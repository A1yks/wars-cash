import c from 'clsx';
import styles from './Select.module.scss';
import inputStyles from '../Input/Input.module.scss';
import { ReactNode } from 'react';

export type SelectProps = {
    children: ReactNode;
};

function Select(props: SelectProps) {
    return <select className={c(styles.select, inputStyles.input)}>{props.children}</select>;
}

export default Select;
