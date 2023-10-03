import useAppSelector from 'hooks/useAppSelector';
import { useGetUsersQuery } from 'store/api/user';

function useUsersContent() {
    const { isLoading: isGettingUsers } = useGetUsersQuery({});
    const { users: usersInfo, total: totalUsers } = useAppSelector((state) => state.usersInfo);

    return { totalUsers, usersInfo, isGettingUsers };
}

export default useUsersContent;
