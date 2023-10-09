import { IPayment } from '@backend/models/Payment/types';
import useErrorsHandler from 'hooks/useErrorsHandler';
import { useEffect, useRef, useState } from 'react';
import { useChangePaymentStatusMutation } from 'store/api/payments';

function useChangeStatus(payment: IPayment) {
    const [changePaymentStatusMutation, { isLoading: isUpdatingStatus }] = useChangePaymentStatusMutation();
    const [selectValue, setSelectValue] = useState(payment.status);
    const statusChangedRef = useRef(false);

    const changePaymentStatus = useErrorsHandler(async () => {
        await changePaymentStatusMutation({ paymentId: payment._id, status: selectValue }).unwrap();
    });

    useEffect(() => {
        if (statusChangedRef.current) {
            changePaymentStatus();
        }
    }, [changePaymentStatus, selectValue]);

    function selectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value as IPayment['status']);

        if (!statusChangedRef.current) {
            statusChangedRef.current = true;
        }
    }

    return { isUpdatingStatus, selectValue, selectHandler };
}

export default useChangeStatus;
