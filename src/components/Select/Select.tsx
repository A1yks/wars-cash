import c from 'clsx';
import styles from './Select.module.scss';
import inputStyles from '../Input/Input.module.scss';
import { ReactNode } from 'react';

export type SelectProps = {
    children: ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

function Select(props: SelectProps) {
    const { className, children, ...selectProps } = props;

    return (
        <select className={c(styles.select, inputStyles.input, className)} {...selectProps}>
            {children}
        </select>
    );
}

export default Select;
