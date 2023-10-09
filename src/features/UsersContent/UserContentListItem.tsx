import UserInfoCard from 'components/UserInfoCard';
import { IUser, Roles } from '@backend/models/User/types';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useChangeBalanceMutation, useChangeRoleMutation, useRestrictAccessMutation } from 'store/api/user';
import { UserAdminInfo } from '@backend/services/user/types';
import useAppSelector from 'hooks/useAppSelector';

export type UserContentListItemProps = {
    info: UserAdminInfo;
};

function UserContentListItem(props: UserContentListItemProps) {
    const user = useAppSelector((state) => state.user);
    const [changeBalanceMutation, { isLoading: isUpdatingBalance }] = useChangeBalanceMutation();
    const [changeRoleMutation, { isLoading: isUpdatingRole }] = useChangeRoleMutation();
    const [restrictAccessMutation, { isLoading: isUpdatingUserAccess }] = useRestrictAccessMutation();

    const saveBalanceHandler = useErrorsHandler(async (userId: IUser['_id'], newBalance: number) => {
        await changeBalanceMutation({ userId, newBalance }).unwrap();
    });

    const saveRoleHandler = useErrorsHandler(async (userId: IUser['_id'], newRole: Roles) => {
        await changeRoleMutation({ userId, newRole }).unwrap();
    });

    const banHandler = useErrorsHandler(async (userId: IUser['_id']) => {
        await restrictAccessMutation({ userId, isRestricted: true }).unwrap();
    });

    const unbanHandler = useErrorsHandler(async (userId: IUser['_id']) => {
        await restrictAccessMutation({ userId, isRestricted: false }).unwrap();
    });

    if (user === null) {
        return;
    }

    return (
        <UserInfoCard
            {...props.info}
            adminId={user._id}
            adminRole={user.role}
            userId={props.info._id}
            isUpdatingBalance={isUpdatingBalance}
            isUpdatingRole={isUpdatingRole}
            isUpdatingUserAccess={isUpdatingUserAccess}
            saveBalanceHandler={saveBalanceHandler}
            saveRoleHandler={saveRoleHandler}
            onBan={banHandler}
            onUnban={unbanHandler}
        />
    );
}

export default UserContentListItem;
