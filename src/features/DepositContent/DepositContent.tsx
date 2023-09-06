import c from 'clsx';
import styles from './DepositContent.module.scss';
import Input from 'components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OperationsHistory from 'components/OperationsHistory';
import Button from 'components/Button';
import { faArrowRight, faHistory } from '@fortawesome/free-solid-svg-icons';
import { WithOperations } from 'components/OperationsHistory/OperationsHistory.stories';

const operationsTitles = {
    date: 'Дата',
    sum: 'Сумма',
};

function DepositContent() {
    return (
        <div className={c(styles.deposit, 'content')}>
            <form className={c(styles.form, 'content')}>
                <h3 className="title">Пополнение</h3>
                <Input placeholder="Сумма" inputMode="numeric" required />
                <Button color="black" className={styles.continueBtn} type="submit">
                    <span>Далее</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </form>
            {/* <OperationsHistory titles={operationsTitles} {...WithOperations.args} /> */}
        </div>
    );
}

export default DepositContent;
