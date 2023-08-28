import UserCard from 'components/UserCard';
import { UserCardProps } from 'components/UserCard/UserCard';
import { ReactNode } from 'react';
import styles from './UserListItem.module.scss';
import c from 'clsx';

export type UserListItemProps = {
    className?: string;
    children?: ReactNode;
} & Omit<UserCardProps, 'className'>;

function UserListItem(props: UserListItemProps) {
    const { className, children, ...userCardProps } = props;

    return (
        <li className={c(styles.listItem, className)}>
            <UserCard {...userCardProps} />
            {children !== undefined && <div className={styles.rightContent}>{children}</div>}
        </li>
    );
}

export default UserListItem;
