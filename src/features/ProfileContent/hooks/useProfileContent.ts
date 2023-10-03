import useAppSelector from 'hooks/useAppSelector';
import useFormState from 'hooks/useFormState';
import { useChangeNameMutation } from 'store/api/user';
import useChangeAvatar from './useChangeAvatar';
import { useGetPaymentsQuery } from 'store/api/payments';
import { createSelector } from '@reduxjs/toolkit';
import { paymentsSelector, userSelector } from 'store/selectors';
import { PaymentStatus } from '@backend/models/Payment/types';

const selector = createSelector([userSelector, paymentsSelector], (user, paymentsData) => ({ user, payments: paymentsData.requests }));

function useProfileContent() {
    const { user, payments } = useAppSelector(selector);
    const { selectPhotoHandler, isUpdatingAvatar } = useChangeAvatar();
    const [changeNameMutation, { isLoading: isUpdatingName }] = useChangeNameMutation();
    const { isFetching: isLoadingPayments } = useGetPaymentsQuery({ filter: encodeURIComponent(JSON.stringify({ status: '*' })) });
    const { formState, changeHandler } = useFormState(() => ({
        name: user?.name,
    }));

    async function changeName() {
        if (formState.name !== undefined && formState.name !== user?.name) {
            await changeNameMutation(formState.name).unwrap();
        }
    }

    return { user, payments, formState, isUpdatingName, isUpdatingAvatar, isLoadingPayments, changeHandler, changeName, selectPhotoHandler };
}

export default useProfileContent;
