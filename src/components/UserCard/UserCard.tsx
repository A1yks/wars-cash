import Avatar, { AvatarProps } from 'components/Avatar/Avatar';
import styles from './UserCard.module.scss';
import c from 'clsx';
import Link from 'next/link';

export type UserCardProps = {
    name: string;
    avatarSrc: AvatarProps['src'];
    avatarSize?: AvatarProps['size'];
    avatarRole?: AvatarProps['role'];
    avatarPriority?: boolean;
    profileUrl?: string;
    className?: string;
    infoClassName?: string;
    showNameTooltip?: boolean;
    onClick?: () => void;
};

function UserCard(props: UserCardProps) {
    const avatarJsx = <Avatar src={props.avatarSrc} size={props.avatarSize} role={props.avatarRole} priority={props.avatarPriority} />;

    return (
        <div className={c(styles.userCard, props.className)} onClick={props.onClick}>
            {props.profileUrl === undefined ? avatarJsx : <Link href={props.profileUrl}>{avatarJsx}</Link>}
            <div className={c(styles.info, props.infoClassName)} title={props.showNameTooltip ? props.name : undefined}>
                {props.profileUrl === undefined ? props.name : <Link href={props.profileUrl}>{props.name}</Link>}
            </div>
        </div>
    );
}

export default UserCard;
