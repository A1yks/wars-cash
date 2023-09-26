import { useState } from 'react';
import useEvent from './useEvent';
import formatNumber from '@backend/utils/formatNumber';

type Config = {
    initialValue?: number;
    maxValue?: number;
};

function useInputNumber(config?: Config) {
    const { initialValue = 0, maxValue } = config || {};
    const [value, setValue] = useState(initialValue);
    const [inpValue, setInpValue] = useState(initialValue === 0 ? '' : value.toString());

    function changeValue(value: string) {
        setInpValue(value);
        setValue(Number(value) || 0);
    }

    const inpChangeHandler = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d+\.?\d*$/.test(value) || value === '') {
            setInpValue(value);
        }
    });

    const inpBlurHandler = useEvent((e: React.FocusEvent<HTMLInputElement>) => {
        const value = formatNumber(Number(e.target.value));

        if (maxValue !== undefined && value > maxValue) {
            changeValue(maxValue.toString());
        } else {
            changeValue(value.toString());
        }
    });

    return {
        value,
        inpValue,
        inpChangeHandler,
        inpBlurHandler,
        changeValue,
    };
}

export default useInputNumber;
