import c from 'clsx';
import styles from './WithdrawalContent.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import OperationsHistory from 'components/OperationsHistory';
import useWithdrawal from './hooks/useWithdrawal';
import Select from 'components/Select';
import { PaymentSystem } from '@backend/models/Payment/types';
import ControlledInput from 'components/ControlledInput';

const operationsTitles = {
    date: 'Дата',
    sum: 'Сумма',
    walletType: 'Тип кошелька',
    wallet: 'Кошелек',
    status: 'Статус',
};

const paymentSystemGroups = [
    {
        name: 'Платежные системы',
        values: [PaymentSystem.Qiwi, PaymentSystem.WebMoney, PaymentSystem.YooMoney, PaymentSystem.Payeer],
    },
    {
        name: 'Мобильная связь (Россия)',
        values: [PaymentSystem.Beeline, PaymentSystem.Megafon, PaymentSystem.MTS, PaymentSystem.Tele2],
    },
    {
        name: 'Банковские карты',
        values: [PaymentSystem.Visa, PaymentSystem.MasterCard],
    },
];

function WithdrawalContent() {
    const {
        control,
        isBtnDisabled,
        isCreatingPaymentOrder,
        sumWithComission,
        formState,
        sumValue,
        inpChangeHandler,
        inpBlurHandler,
        submitHandler,
        changeHandler,
    } = useWithdrawal();

    return (
        <div className={c(styles.withdrawal, 'content')}>
            <h3 className="title">Вывод</h3>
            <form className={c(styles.form, 'content')} onSubmit={submitHandler}>
                <Select onChange={changeHandler('paymentSystem')} value={formState.paymentSystem}>
                    {paymentSystemGroups.map((group, i) => (
                        <optgroup label={group.name} key={i}>
                            {group.values.map((value, i) => (
                                <option value={value} key={i}>
                                    {value}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </Select>
                <ControlledInput
                    control={control}
                    name="sum"
                    placeholder="Сумма"
                    inputMode="numeric"
                    value={sumValue}
                    onChange={inpChangeHandler}
                    onBlur={inpBlurHandler}
                />
                <ControlledInput control={control} name="wallet" placeholder="Кошелек" value={formState.wallet} onChange={changeHandler('wallet')} />
                <Button color="black" type="submit" className={styles.submitBtn} disabled={isBtnDisabled} loading={isCreatingPaymentOrder}>
                    Вывод ( <FontAwesomeIcon icon={faFileInvoice} /> {sumWithComission})
                </Button>
            </form>
        </div>
    );
}

export default WithdrawalContent;
