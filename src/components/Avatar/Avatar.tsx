import React from 'react';
import Image from 'next/image';
import c from 'clsx';
import styles from './Avatar.module.scss';
import { Roles } from 'types/global';

export type AvatarProps = {
    src: string;
    className?: string;
    size?: number;
    role?: Roles;
};

function Avatar(props: AvatarProps) {
    const { size = 50, role = Roles.User } = props;

    return (
        <div className={c(styles.avatar, 'flex', 'center', props.className)}>
            <div className={styles.imgWrapper}>
                <Image src={props.src} alt="User avatar" width={size} height={size} />
            </div>
            {role !== Roles.User && <div className={c(styles.status, styles[role], 'flex', 'center')}>{role}</div>}
        </div>
    );
}

export default Avatar;
