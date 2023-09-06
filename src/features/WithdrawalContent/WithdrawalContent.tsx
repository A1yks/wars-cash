import c from 'clsx';
import styles from './WithdrawalContent.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import OperationsHistory from 'components/OperationsHistory';
import useWithdrawal from './hooks/useWithdrawal';
import Select from 'components/Select';

const operationsTitles = {
    date: 'Дата',
    sum: 'Сумма',
    walletType: 'Тип кошелька',
    wallet: 'Кошелек',
    status: 'Статус',
};

function WithdrawalContent() {
    const { isBtnDisabled, sumWithComission, inpValue, inpChangeHandler, inpBlurHandler } = useWithdrawal();

    return (
        <div className={c(styles.withdrawal, 'content')}>
            <h3 className="title">Вывод</h3>
            <form className={c(styles.form, 'content')}>
                <Select>
                    <optgroup label="Платежные системы">
                        <option value="qiwi">Qiwi</option>
                        <option value="webmoney">WebMoney</option>
                        <option value="yandex">Яндекс.Деньги</option>
                        <option value="payeer">PAYEER</option>
                    </optgroup>
                    <optgroup label="Мобильная связь (Россия)">
                        <option value="beeline">Билайн</option>
                        <option value="megafon">Мегафон</option>
                        <option value="mts">МТС</option>
                        <option value="tele2">Теле 2</option>
                    </optgroup>
                    <optgroup label="Банковские карты">
                        <option value="visa">VISA (от 1100р)</option>
                        <option value="mastercard">MASTERCARD (от 1100р)</option>
                    </optgroup>
                </Select>
                <Input placeholder="Сумма" inputMode="numeric" required value={inpValue} onChange={inpChangeHandler} onBlur={inpBlurHandler} />
                <Input placeholder="Кошелек" required />
                <Button color="black" type="submit" className={styles.submitBtn} disabled={isBtnDisabled}>
                    Вывод ( <FontAwesomeIcon icon={faFileInvoice} /> {sumWithComission})
                </Button>
            </form>
            {/* <OperationsHistory
                titles={operationsTitles}
                data={[
                    {
                        date: '22.03.2022',
                        sum: '1000',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '21.03.2022',
                        sum: '500',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '20.03.2022',
                        sum: '750',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '19.03.2022',
                        sum: '250',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '18.03.2022',
                        sum: '1250',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '17.03.2022',
                        sum: '1500',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                    {
                        date: '16.03.2022',
                        sum: '2000',
                        walletType: 'Qiwi',
                        wallet: '7*******567',
                        status: 'Выполнено',
                    },
                ]}
            /> */}
        </div>
    );
}

export default WithdrawalContent;
