import styles from './PaymentRequestsTable.module.scss';
import { IPayment, paymentStatuses } from '@backend/models/Payment/types';
import Spinner from 'components/Spinner/Spinner';
import Select from 'components/Select';
import dayjs from 'dayjs';
import useChangeStatus from './hooks/useChangeStatus';

export type PaymentTableRowProps = {
    payment: IPayment;
    staticStaus?: boolean;
};

function PaymentTableRow(props: PaymentTableRowProps) {
    const { payment, staticStaus } = props;
    const { isUpdatingStatus, selectValue, selectHandler } = useChangeStatus(payment);

    return (
        <tr>
            <td>{dayjs(payment.date).format('DD.MM.YYYY')}</td>
            <td>{payment.sum}</td>
            <td>{payment.paymentSystem}</td>
            <td>{payment.wallet}</td>
            <td>
                {staticStaus ? (
                    payment.status
                ) : isUpdatingStatus ? (
                    <Spinner size="small" className={styles.spinner} />
                ) : (
                    <Select value={selectValue} onChange={selectHandler}>
                        {paymentStatuses.map((status, i) => (
                            <option key={i}>{status}</option>
                        ))}
                    </Select>
                )}
            </td>
        </tr>
    );
}

export default PaymentTableRow;
