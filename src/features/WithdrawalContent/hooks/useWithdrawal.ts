import useInputNumber from 'hooks/useInputNumber';
import { useState } from 'react';

const COMISSION_RATE = 0.05;

function useWithdrawal() {
    const { value, inpValue, inpChangeHandler, inpBlurHandler } = useInputNumber({ maxValue: 100 });
    const sumWithComission = (value * (1 - COMISSION_RATE)).toFixed(2);
    const isBtnDisabled = value === 0;

    return { isBtnDisabled, sumWithComission, inpValue, inpChangeHandler, inpBlurHandler };
}

export default useWithdrawal;
