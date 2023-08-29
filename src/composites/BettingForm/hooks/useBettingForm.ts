import { useCallback, useEffect, useRef, useState } from 'react';
import useEvent from 'hooks/useEvent';
import { BettingFormProps, ControlData } from '../BettingForm';

function useBettingForm(props: BettingFormProps) {
    const [balance, setBalance] = useState(props.balance);
    const [betValue, setBetValue] = useState(0);
    const [inpValue, setInpValue] = useState('');
    const inpRef = useRef<HTMLInputElement>(null);

    const changeBetValue = useCallback(
        (value: number) => {
            const roundedValue = Number(value.toFixed(2));
            let finalValue = roundedValue;

            if (roundedValue < 0) {
                finalValue = 0;
            } else if (roundedValue > props.balance) {
                finalValue = props.balance;
            }

            setBetValue(finalValue);
            setInpValue(finalValue === 0 ? '' : finalValue.toString());
        },
        [props.balance]
    );

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

    function betClickHandler(team: 'red' | 'blue') {
        return () => {
            switch (team) {
                case 'red':
                    props.onRedTeamBet(betValue);
                    break;
                case 'blue':
                    props.onBlueTeamBet(betValue);
                    break;
            }
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
