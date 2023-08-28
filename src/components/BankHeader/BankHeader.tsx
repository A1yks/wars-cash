import Image from 'next/image';
import styles from './BankHeader.module.scss';
import c from 'clsx';

export type BankHeaderProps = {
    className?: string;
    variant: 'red' | 'blue';
    title: string;
    coeff: number;
};

function BankHeader(props: BankHeaderProps) {
    return (
        <div className={c(styles.bankHeader, styles[props.variant], props.className)}>
            <div className={styles.titleWrapper}>
                <Image src="/images/bank.png" width={46} height={44} alt="" />
                <span>{props.title}</span>
            </div>
            <div className={c(styles.coeff, 'flex', 'center')}>×{props.coeff}</div>
        </div>
    );
}

export default BankHeader;
