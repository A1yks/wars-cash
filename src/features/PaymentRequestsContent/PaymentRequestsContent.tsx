import PaymentRequestsTable from 'features/PaymentRequestsTable/PaymentRequestsTable';
import styles from './PaymentRequestsContent.module.scss';

function PaymentRequestsContent() {
    return <PaymentRequestsTable className={styles.table} />;
}

export default PaymentRequestsContent;
