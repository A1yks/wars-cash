import { UserAdminInfo } from '@backend/services/user/types';
import styles from './UsersContent.module.scss';
import UserContentListItem from './UserContentListItem';

export type UserContentListProps = {
    usersInfo: UserAdminInfo[];
};

function UsersContentList(props: UserContentListProps) {
    return (
        <div className={styles.userInfoList}>
            {props.usersInfo.map((info) => (
                <UserContentListItem key={info._id.toString()} info={info} />
            ))}
        </div>
    );
}

export default UsersContentList;
