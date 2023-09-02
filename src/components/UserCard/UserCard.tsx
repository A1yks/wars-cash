import Avatar, { AvatarProps } from 'components/Avatar/Avatar';
import styles from './UserCard.module.scss';
import c from 'clsx';
import Link from 'next/link';

export type UserCardProps = {
    name: string;
    surname: string;
    avatarSrc: AvatarProps['src'];
    avatarSize?: AvatarProps['size'];
    avatarRole?: AvatarProps['role'];
    profileUrl?: string;
    className?: string;
};

function UserCard(props: UserCardProps) {
    const fullName = `${props.name} ${props.surname}`;

    const avatarJsx = <Avatar src={props.avatarSrc} size={props.avatarSize} role={props.avatarRole} />;

    return (
        <div className={c(styles.userCard, props.className)}>
            {props.profileUrl === undefined ? avatarJsx : <Link href={props.profileUrl}>{avatarJsx}</Link>}
            <div className={styles.info}>{props.profileUrl === undefined ? fullName : <Link href={props.profileUrl}>{fullName}</Link>}</div>
        </div>
    );
}

export default UserCard;
