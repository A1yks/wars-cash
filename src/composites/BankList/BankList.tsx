import BankHeader, { BankHeaderProps } from 'components/BankHeader/BankHeader';
import UserList from 'components/UserList';
import styles from './BankList.module.scss';
import c from 'clsx';
import UserListItem from 'components/UserListItem';
import { memo } from 'react';
import { BetData } from '@backend/services/game/types';

export type BankListProps = {
    className?: string;
    bets: BetData[];
} & Omit<BankHeaderProps, 'className'>;

function BankList(props: BankListProps) {
    const { bets, className, ...bankHeaderProps } = props;

    return (
        <div className={c(styles.bankList, styles[bankHeaderProps.variant], className)}>
            <BankHeader {...bankHeaderProps} />
            <UserList>
                {bets.map(({ bettor, amount }, i) => (
                    <UserListItem key={i} user={bettor}>
                        <span className={styles.betAmount}>{amount.toFixed(2)}</span>
                    </UserListItem>
                ))}
            </UserList>
        </div>
    );
}

export default memo(BankList);
