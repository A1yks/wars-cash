import { UserAdminInfo } from '@backend/services/user/types';
import UserInfoCard from 'components/UserInfoCard';
import styles from './UsersContent.module.scss';
import { useChangeBalanceMutation } from 'store/api/user';
import { IUser } from '@backend/models/User/types';
import useErrorsHandler from 'hooks/useErrorsHandler';

export type UserContentListProps = {
    usersInfo: UserAdminInfo[];
};

function UsersContentList(props: UserContentListProps) {
    const [changeBalanceMutation, { isLoading: isUpdatingBalance }] = useChangeBalanceMutation();

    const saveBalanceHandler = useErrorsHandler(async (userId: IUser['_id'], newBalance: number) => {
        await changeBalanceMutation({ userId, newBalance });
    });

    return (
        <div className={styles.userInfoList}>
            {props.usersInfo.map((info) => (
                <UserInfoCard
                    key={info._id.toString()}
                    {...info}
                    userId={info._id}
                    isUpdatingBalance={isUpdatingBalance}
                    saveBalanceHandler={saveBalanceHandler}
                />
            ))}
        </div>
    );
}

export default UsersContentList;
