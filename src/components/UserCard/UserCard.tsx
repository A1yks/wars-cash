import Avatar, { AvatarProps } from 'components/Avatar/Avatar';
import styles from './UserCard.module.scss';
import c from 'clsx';
import Link from 'next/link';

export type UserCardProps = {
    name: string;
    avatarSrc: AvatarProps['src'];
    avatarSize?: AvatarProps['size'];
    avatarRole?: AvatarProps['role'];
    profileUrl?: string;
    className?: string;
    onClick?: () => void;
};

function UserCard(props: UserCardProps) {
    const avatarJsx = <Avatar src={props.avatarSrc} size={props.avatarSize} role={props.avatarRole} />;

    return (
        <div className={c(styles.userCard, props.className)} onClick={props.onClick}>
            {props.profileUrl === undefined ? avatarJsx : <Link href={props.profileUrl}>{avatarJsx}</Link>}
            <div className={styles.info}>{props.profileUrl === undefined ? props.name : <Link href={props.profileUrl}>{props.name}</Link>}</div>
        </div>
    );
}

export default UserCard;
