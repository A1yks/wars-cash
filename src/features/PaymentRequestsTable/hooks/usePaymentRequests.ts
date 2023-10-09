import { Pagination } from '@backend/common/types';
import { IPayment, PaymentStatus } from '@backend/models/Payment/types';
import { IUser } from '@backend/models/User/types';
import useAppSelector from 'hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useLazyGetPaymentsQuery } from 'store/api/payments';
import { PaymentRequestStatus } from '../PaymentRequestsNavigation';

const PAYMENT_REQUESTS_PER_PAGE = 8;

type SortValue = {
    [key in keyof Omit<IPayment, '_id' | 'user'>]: 1 | -1;
};

type ReqParams = Pagination & {
    sort?: NonNullable<keyof Omit<IPayment, '_id' | 'user'>>;
    status?: PaymentRequestStatus;
};

const statuses = {
    pending: PaymentStatus.Pending,
    rejected: PaymentStatus.Rejected,
    processed: PaymentStatus.Success,
};

function usePaymentRequests(userId?: IUser['_id']) {
    const [triggerGetPaymentRequests, { isLoading, isFetching }] = useLazyGetPaymentsQuery();
    const { requests: paymentRequests, total } = useAppSelector((state) => state.payments);
    const pagesCount = Math.ceil(total / PAYMENT_REQUESTS_PER_PAGE);
    const [reqParams, setReqParams] = useState<Omit<ReqParams, 'limit'>>({
        offset: 0,
        sort: 'date',
        status: 'pending',
    });
    const { offset, sort = 'date', status = 'pending' } = reqParams;
    const [sortValue, setSortValue] = useState({ [sort]: -1 } as SortValue);

    useEffect(() => {
        triggerGetPaymentRequests({
            limit: PAYMENT_REQUESTS_PER_PAGE,
            offset,
            filter: encodeURIComponent(JSON.stringify({ ...sortValue, status: statuses[status as keyof typeof statuses] })),
            userId,
        });
    }, [offset, sortValue, status, userId, triggerGetPaymentRequests]);

    useEffect(() => {
        return () => {
            setReqParams({ offset: 0, sort: 'date', status: 'pending' });
        };
    }, []);

    async function pageChangeHandler({ selected }: { selected: number }) {
        setReqParams((prev) => ({ ...prev, offset: selected * PAYMENT_REQUESTS_PER_PAGE }));
    }

    function updateStatus(status: keyof typeof statuses) {
        setReqParams((prev) => ({ ...prev, status }));
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

    return { isLoading, isFetching, paymentRequests, pagesCount, sortValue, status, updateStatus, pageChangeHandler, sortClickHandler };
}

export default usePaymentRequests;
