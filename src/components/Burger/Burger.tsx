import c from 'clsx';
import styles from './Burger.module.scss';
import useBooleanState from 'hooks/useBooleanState';

export type BurgerProps = {
    className?: string;
    isOpened: boolean;
    onClick: () => void;
};

function Burger(props: BurgerProps) {
    return (
        <div className={c(styles.burger, { [styles.opened]: props.isOpened }, props.className)} onClick={props.onClick}>
            <div />
            <div />
            <div />
        </div>
    );
}

export default Burger;
