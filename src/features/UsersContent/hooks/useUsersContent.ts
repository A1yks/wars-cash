import { useDebouncedValue } from '@lilib/hooks';
import useAppSelector from 'hooks/useAppSelector';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLazyGetUsersQuery } from 'store/api/user';

const USERS_PER_PAGE = 10;

function useUsersContent() {
    const router = useRouter();
    const offset = router.query.offset ? Number(router.query.offset) : 0;
    const [triggerGetUsers, { isLoading: isGettingUsers }] = useLazyGetUsersQuery();
    const { users: usersInfo, total: totalUsers } = useAppSelector((state) => state.usersInfo);
    const pagesCount = Math.ceil(totalUsers / USERS_PER_PAGE);
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

    useEffect(() => {
        triggerGetUsers({ offset, limit: USERS_PER_PAGE, name: debouncedSearchValue });
    }, [debouncedSearchValue, offset, triggerGetUsers]);

    function pageChangeHandler(selectedItem: number) {
        router.push({ query: { ...router.query, offset: selectedItem * USERS_PER_PAGE } });
    }

    function changeSearchValueHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    return { totalUsers, usersInfo, searchValue, isGettingUsers, pagesCount, pageChangeHandler, changeSearchValueHandler };
}

export default useUsersContent;
