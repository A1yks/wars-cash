import { useCallback, useEffect, useRef, useState } from 'react';
import useEvent from 'hooks/useEvent';
import { BettingFormProps, ControlData } from '../BettingForm';
import { useSnackbar } from 'notistack';
import { BetTypes } from '@backend/services/game/types';

function useBettingForm(props: BettingFormProps) {
    const [balance, setBalance] = useState(props.balance);
    const [betValue, setBetValue] = useState(0);
    const [inpValue, setInpValue] = useState('');
    const inpRef = useRef<HTMLInputElement>(null);
    const { enqueueSnackbar } = useSnackbar();

    const changeBetValue = useCallback((value: number, changeInpValue = true) => {
        const roundedValue = Number(value.toFixed(2));
        let finalValue = roundedValue;

        if (roundedValue < 0) {
            finalValue = 0;
        }

        setBetValue(finalValue);

        if (changeInpValue) {
            setInpValue(finalValue === 0 ? '' : finalValue.toString());
        }
    }, []);

    function resetBetValue() {
        setBetValue(0);
        setInpValue('');
    }

    useEffect(() => {
        setBalance(props.balance);
    }, [props.balance]);

    const plusClickHandler = useEvent(() => {
        changeBetValue(betValue + 1);
    });

    const minusClickHandler = useEvent(() => {
        changeBetValue(betValue - 1);
    });

    const inpChangeHandler = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!/^\d+\.?\d*$/.test(value)) {
            return;
        }

        changeBetValue(Number(value), false);
        setInpValue(value);
    });

    const inpBlurHandler = useEvent(() => {
        changeBetValue(Number(inpValue));
    });

    function betControlClickHandler({ amount, action }: ControlData) {
        return () => {
            switch (action) {
                case 'plus':
                    changeBetValue(betValue + amount);
                    break;
                case 'minus':
                    changeBetValue(betValue - amount);
                    break;
                case 'multiply':
                    changeBetValue(betValue * amount);
                    break;
                case 'divide':
                    changeBetValue(betValue / amount);
                    break;
            }
        };
    }

    function betClickHandler(team: BetTypes) {
        return async () => {
            if (betValue === 0) {
                enqueueSnackbar('Введите сумму ставки', { variant: 'error' });
                return;
            }

            if (balance === 0 || betValue > balance) {
                enqueueSnackbar('Недостаточно средств', { variant: 'error' });
                return;
            }

            await props.onBet(team, betValue);

            resetBetValue();
            inpRef.current?.focus();
        };
    }

    const maxClickHandler = useEvent(() => {
        changeBetValue(props.balance);
    });

    const minClickHandler = useEvent(() => {
        changeBetValue(0);
        inpRef.current?.focus();
    });

    return {
        inpRef,
        balance,
        inpValue,
        betValue,
        plusClickHandler,
        minusClickHandler,
        inpChangeHandler,
        inpBlurHandler,
        betControlClickHandler,
        betClickHandler,
        maxClickHandler,
        minClickHandler,
    };
}

export default useBettingForm;
