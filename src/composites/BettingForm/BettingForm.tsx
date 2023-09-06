import c from 'clsx';
import styles from './BettingForm.module.scss';
import BlockContainer from 'components/BlockContainer';
import Button from 'components/Button';
import useBettingForm from './hooks/useBettingForm';
import Input from 'components/Input';
import Icon from 'components/Icon/Icon';

export type BettingFormProps = {
    balance: number;
    onRedTeamBet: (value: number) => void;
    onBlueTeamBet: (value: number) => void;
};

export type ControlData = {
    amount: number;
    action: 'plus' | 'minus' | 'multiply' | 'divide';
    value: string;
};

const betControls: ControlData[] = [
    {
        amount: 0.1,
        value: '+0.1',
        action: 'plus',
    },
    {
        amount: 1,
        value: '+1',
        action: 'plus',
    },
    {
        amount: 5,
        value: '+5',
        action: 'plus',
    },
    {
        amount: 10,
        value: '+10',
        action: 'plus',
    },
    {
        amount: 100,
        value: '+100',
        action: 'plus',
    },
    {
        amount: 2,
        value: '×2',
        action: 'multiply',
    },
    {
        amount: 2,
        value: '1/2',
        action: 'divide',
    },
];

function BettingForm(props: BettingFormProps) {
    const {
        inpRef,
        balance,
        inpValue,
        betValue,
        inpChangeHandler,
        inpBlurHandler,
        plusClickHandler,
        minusClickHandler,
        betControlClickHandler,
        betClickHandler,
        maxClickHandler,
        minClickHandler,
    } = useBettingForm(props);

    return (
        <BlockContainer className={styles.bettingForm}>
            <div className={c(styles.betAmount, 'flex', 'center')}>
                <Button color="dark-gray" variant="round" onClick={plusClickHandler}>
                    <Icon src="/images/plus.png" className={c(styles.icon, styles.plusIcon)} />
                </Button>
                <span className={styles.balance}>{balance}</span>
                <Button color="dark-gray" variant="round" onClick={minusClickHandler}>
                    <Icon src="/images/minus.png" className={c(styles.icon, styles.minusIcon)} />
                </Button>
            </div>
            <Input
                ref={inpRef}
                type="text"
                inputMode="numeric"
                className={styles.betInput}
                value={inpValue}
                onChange={inpChangeHandler}
                onBlur={inpBlurHandler}
            />
            <div className={styles.betControls}>
                <Button variant="text" onClick={minClickHandler}>
                    <Icon src="/images/trash.png" width={22} height={22} />
                </Button>
                {betControls.map((control, i) => (
                    <Button key={i} variant="text" onClick={betControlClickHandler(control)}>
                        {control.value}
                    </Button>
                ))}
                <Button variant="text" onClick={maxClickHandler}>
                    Max
                </Button>
            </div>
            <div className={styles.betBtns}>
                <Button color="red" onClick={betClickHandler('red')}>
                    <div className={styles.betBtnContent}>
                        <Icon src="/images/set.png" width={22} height={22} />
                        <span>Поставить</span>
                    </div>
                </Button>
                <Button color="blue" onClick={betClickHandler('blue')}>
                    <div className={styles.betBtnContent}>
                        <Icon src="/images/set.png" width={22} height={22} />
                        <span>Поставить</span>
                    </div>
                </Button>
            </div>
        </BlockContainer>
    );
}

export default BettingForm;
