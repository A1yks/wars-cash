import useAppSelector from 'hooks/useAppSelector';
import useFormState from 'hooks/useFormState';
import { useChangeNameMutation } from 'store/api/user';
import useChangeAvatar from './useChangeAvatar';
import { useGetPaymentsQuery } from 'store/api/payments';
import { createSelector } from '@reduxjs/toolkit';
import { paymentsSelector, userSelector } from 'store/selectors';
import { PaymentStatus } from '@backend/models/Payment/types';

function useProfileContent() {
    const user = useAppSelector(userSelector);
    const { selectPhotoHandler, isUpdatingAvatar } = useChangeAvatar();
    const [changeNameMutation, { isLoading: isUpdatingName }] = useChangeNameMutation();
    const { formState, changeHandler } = useFormState(() => ({
        name: user?.name,
    }));

    async function changeName() {
        if (formState.name !== undefined && formState.name !== user?.name) {
            await changeNameMutation(formState.name).unwrap();
        }
    }

    return { user, formState, isUpdatingName, isUpdatingAvatar, changeHandler, changeName, selectPhotoHandler };
}

export default useProfileContent;
