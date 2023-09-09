import React from 'react';
import Image from 'next/image';
import c from 'clsx';
import styles from './Avatar.module.scss';
import { Roles } from '@backend/models/User/types';
import getImageSrc from 'utils/getImageSrc';

export type AvatarProps = {
    src: string;
    className?: string;
    size?: number;
    role?: Roles;
    priority?: boolean;
};

function Avatar(props: AvatarProps) {
    const { size = 50, role = Roles.User } = props;

    return (
        <div className={c(styles.avatar, 'flex', 'center', props.className)}>
            <div className={styles.imgWrapper}>
                <Image src={getImageSrc(props.src, 'users')} alt="User avatar" width={size} height={size} priority={props.priority} />
            </div>
            {role !== Roles.User && <div className={c(styles.status, styles[role], 'flex', 'center')}>{role}</div>}
        </div>
    );
}

export default Avatar;
