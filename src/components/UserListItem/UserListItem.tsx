import UserCard from 'components/UserCard';
import { ReactNode } from 'react';
import styles from './UserListItem.module.scss';
import c from 'clsx';
import ChatMessage from 'components/ChatMessage';
import { PublicUserData } from '@backend/models/User/types';
import { MessageData, ModerationData } from '@backend/services/socket/types';

export type UserListItemCardProps = {
    variant: 'default';
    children?: ReactNode;
    profileUrl?: string;
    user: PublicUserData;
};

export type UserListItemCustomProps = {
    variant: 'custom';
    children?: ReactNode;
    profileUrl?: never;
    user?: never;
};

export type UserListItemProps = (UserListItemCardProps | UserListItemCustomProps) & { className?: string };

function UserListItem(props: UserListItemProps) {
    const { className, children, variant, user, profileUrl } = props;

    return (
        <li className={c(styles.listItem, className)}>
            {variant === 'default' ? (
                <>
                    <UserCard name={user.name} avatarSrc={user.avatar} avatarRole={user.role} profileUrl={profileUrl} />
                    {children !== undefined && <div className={styles.rightContent}>{children}</div>}
                </>
            ) : (
                props.children
            )}
        </li>
    );
}

export default UserListItem;
