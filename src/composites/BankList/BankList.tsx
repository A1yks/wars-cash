import BankHeader, { BankHeaderProps } from 'components/BankHeader/BankHeader';
import UserList from 'components/UserList';
import styles from './BankList.module.scss';
import c from 'clsx';
import { Bet } from 'types/global';
import UserListItem from 'components/UserListItem';

export type BankListProps = {
    className?: string;
    bets: Bet[];
} & Omit<BankHeaderProps, 'className'>;

function BankList(props: BankListProps) {
    const { bets, className, ...bankHeaderProps } = props;

    return (
        <div className={c(styles.bankList, styles[bankHeaderProps.variant], className)}>
            <BankHeader {...bankHeaderProps} />
            <UserList>
                {bets.map(({ user, amount }) => (
                    <UserListItem key={user.id.toString()} name={user.name} surname={user.surname} avatarSrc={user.avatar} avatarRole={user.role}>
                        <span className={styles.betAmount}>{amount.toFixed(2)}</span>
                    </UserListItem>
                ))}
            </UserList>
        </div>
    );
}

export default BankList;
