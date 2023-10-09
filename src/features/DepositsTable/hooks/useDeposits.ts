import { Pagination } from '@backend/common/types';
import { IUser } from '@backend/models/User/types';
import { useEffect, useState } from 'react';
import { useLazyGetDepositsQuery } from 'store/api/deposits';
import { IDeposit } from '@backend/models/Deposit/types';

const DEPOSITS_PER_PAGE = 8;

type SortValue = {
    [key in keyof Omit<IDeposit, '_id' | 'user'>]: 1 | -1;
};

type ReqParams = Pagination & {
    sort?: NonNullable<keyof Omit<IDeposit, '_id' | 'user'>>;
};

function useDeposits(userId?: IUser['_id']) {
    const [triggerGetDeposits, { data: response, isLoading, isFetching }] = useLazyGetDepositsQuery();
    const { deposits = [], total = 0 } = response?.data || {};
    const pagesCount = Math.ceil(total / DEPOSITS_PER_PAGE);
    const [reqParams, setReqParams] = useState<Omit<ReqParams, 'limit'>>({ offset: 0, sort: 'date' });
    const { offset, sort = 'date' } = reqParams;
    const [sortValue, setSortValue] = useState({ [sort]: -1 } as SortValue);

    useEffect(() => {
        triggerGetDeposits({
            limit: DEPOSITS_PER_PAGE,
            offset,
            filter: encodeURIComponent(JSON.stringify(sortValue)),
            userId,
        });
    }, [offset, sortValue, userId, triggerGetDeposits]);

    useEffect(() => {
        return () => {
            setReqParams({ offset: 0, sort: 'date' });
        };
    }, []);

    async function pageChangeHandler(selectedPage: number) {
        setReqParams((prev) => ({ ...prev, offset: selectedPage * DEPOSITS_PER_PAGE }));
    }

    function sortClickHandler(sortType: typeof sort) {
        return () => {
            if (sort === sortType) {
                setSortValue((prev) => ({ [sortType]: prev[sortType] === 1 ? -1 : 1 } as SortValue));
            } else {
                setSortValue({ [sortType]: -1 } as SortValue);
            }

            setReqParams((prev) => ({ ...prev, sort: sortType }));
        };
    }

    return { isLoading, isFetching, pagesCount, sortValue, deposits, pageChangeHandler, sortClickHandler };
}

export default useDeposits;
