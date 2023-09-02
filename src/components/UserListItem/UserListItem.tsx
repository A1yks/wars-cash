import UserCard from 'components/UserCard';
import { UserCardProps } from 'components/UserCard/UserCard';
import { ReactNode } from 'react';
import styles from './UserListItem.module.scss';
import c from 'clsx';
import ChatMessage from 'components/ChatMessage';
import { User } from 'types/global';

export type UserListItemProps = (
    | {
          variant?: 'default';
          children?: ReactNode;
          profileUrl?: string;
      }
    | {
          variant?: 'message';
          children: string & {};
          profileUrl?: never;
      }
) & { className?: string; user: User };

function UserListItem(props: UserListItemProps) {
    const { className, children, variant = 'default', user, profileUrl } = props;

    return (
        <li className={c(styles.listItem, className)}>
            {variant === 'default' ? (
                <>
                    <UserCard name={user.name} surname={user.surname} avatarSrc={user.avatar} avatarRole={user.role} profileUrl={profileUrl} />
                    {children !== undefined && <div className={styles.rightContent}>{children}</div>}
                </>
            ) : (
                <ChatMessage user={user}>{children as string}</ChatMessage>
            )}
        </li>
    );
}

export default UserListItem;
