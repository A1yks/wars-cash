import { Pagination } from '@backend/common/types';
import { IPayment, PaymentStatus } from '@backend/models/Payment/types';
import useAppSelector from 'hooks/useAppSelector';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLazyGetPaymentsQuery } from 'store/api/payments';

const PAYMENT_REQUESTS_PER_PAGE = 8;

type SortValue = {
    [key in keyof Omit<IPayment, '_id' | 'user'>]: 1 | -1;
};

type RouterQuery = Pagination & {
    sort?: NonNullable<keyof Omit<IPayment, '_id' | 'user'>>;
    status?: string;
};

const statuses = {
    pending: PaymentStatus.Pending,
    rejected: PaymentStatus.Rejected,
    processed: PaymentStatus.Success,
};

function usePaymentRequests() {
    const [triggerGetPaymentRequests, { isLoading, isFetching }] = useLazyGetPaymentsQuery();
    const { requests: paymentRequests, total } = useAppSelector((state) => state.payments);
    const pagesCount = Math.ceil(total / PAYMENT_REQUESTS_PER_PAGE);
    const router = useRouter();
    const { offset = 0, sort = 'date', status = 'pending' } = router.query as RouterQuery;
    const [sortValue, setSortValue] = useState({ [sort]: -1 } as SortValue);

    useEffect(() => {
        triggerGetPaymentRequests({
            limit: PAYMENT_REQUESTS_PER_PAGE,
            offset,
            filter: encodeURIComponent(JSON.stringify({ ...sortValue, status: statuses[status as keyof typeof statuses] })),
        });
    }, [offset, sortValue, status, triggerGetPaymentRequests]);

    async function pageChangeHandler({ selected }: { selected: number }) {
        router.push({ query: { ...router.query, offset: selected * PAYMENT_REQUESTS_PER_PAGE } });
    }

    function sortClickHandler(sortType: typeof sort) {
        return () => {
            if (sort === sortType) {
                setSortValue((prev) => ({ [sortType]: prev[sortType] === 1 ? -1 : 1 } as SortValue));
            } else {
                setSortValue({ [sortType]: -1 } as SortValue);
            }

            router.push({ query: { ...router.query, sort: sortType } });
        };
    }

    return { isLoading, isFetching, paymentRequests, pagesCount, sortValue, pageChangeHandler, sortClickHandler };
}

export default usePaymentRequests;
