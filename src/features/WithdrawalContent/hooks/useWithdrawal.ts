import { createPaymentSchema } from '@backend/controllers/payments/validation';
import { PaymentSystem } from '@backend/models/Payment/types';
import formatNumber from '@backend/utils/formatNumber';
import useAppSelector from 'hooks/useAppSelector';
import useFormState from 'hooks/useFormState';
import useFormValidation from 'hooks/useFormValidation';
import useInputNumber from 'hooks/useInputNumber';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCreatePaymentOrderMutation } from 'store/api/payments';
import { string } from 'yup';

const COMISSION_RATE = 0.05;

const clientCreatePaymentSchema = createPaymentSchema.shape({
    sum: string().required('Сумма является обязательной'),
});

function useWithdrawal() {
    const balance = useAppSelector((state) => state.user?.balance || 0);
    const getInitialFormState = () => ({
        paymentSystem: PaymentSystem.Qiwi,
        sum: 0,
        wallet: '',
    });
    const { formState, changeHandler, resetFormState } = useFormState(getInitialFormState);
    const { enqueueSnackbar } = useSnackbar();
    const [createPaymentMutation, { isLoading: isCreatingPaymentOrder }] = useCreatePaymentOrderMutation();
    const { value: sumValue, inpValue, inpChangeHandler, inpBlurHandler, changeValue: changeSumValue } = useInputNumber({ maxValue: balance });
    const sumWithComission = formatNumber(sumValue * (1 - COMISSION_RATE));
    const isBtnDisabled = sumValue === 0;

    const { control, submitHandler } = useFormValidation(
        createPaymentSchema,
        async () => {
            await createPaymentMutation({
                paymentSystem: formState.paymentSystem,
                sum: sumValue,
                wallet: formState.wallet,
            }).unwrap();
            enqueueSnackbar('Заявка на вывод средств успешно создана', { variant: 'success' });
            resetFormState();
            changeSumValue('');
        },
        {
            defaultValues: {
                paymentSystem: PaymentSystem.Qiwi,
                sum: 0,
                wallet: '',
            },
        }
    );

    return {
        isBtnDisabled,
        isCreatingPaymentOrder,
        formState,
        sumWithComission,
        sumValue: inpValue,
        control,
        submitHandler,
        inpChangeHandler,
        inpBlurHandler,
        changeHandler,
    };
}

export default useWithdrawal;
