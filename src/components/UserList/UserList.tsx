import c from 'clsx';
import styles from './UserList.module.scss';
import { ReactNode } from 'react';

export type UserListProps = {
    className?: string;
    children: ReactNode;
} & React.ComponentPropsWithoutRef<'ul'>;

function UserList(props: UserListProps) {
    const { className, children, ...ulProps } = props;

    return (
        <ul className={c(styles.userList, className)} {...ulProps}>
            {children}
        </ul>
    );
}

export default UserList;
