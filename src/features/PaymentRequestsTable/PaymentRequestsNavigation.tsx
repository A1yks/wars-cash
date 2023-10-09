import c from 'clsx';
import adminNavStyles from 'composites/AdminNavigation/AdminNavigation.module.scss';
import styles from './PaymentRequestsTable.module.scss';

export type PaymentRequestStatus = 'pending' | 'rejected' | 'processed';

export type PaymentRequestsNavigationProps = {
    className?: string;
    currentStatus: PaymentRequestStatus;
    updateStatus: (status: PaymentRequestStatus) => MaybePromise<void>;
};

const routes = [
    {
        title: 'Необработанные заявки',
        query: { status: 'pending' as PaymentRequestStatus },
    },
    {
        title: 'Отклоненные заявки',
        query: { status: 'rejected' as PaymentRequestStatus },
    },
    {
        title: 'Обработанные заявки',
        query: { status: 'processed' as PaymentRequestStatus },
    },
];

function PaymentRequestsNavigation(props: PaymentRequestsNavigationProps) {
    function updateStatusHandler(status: PaymentRequestStatus) {
        return () => props.updateStatus(status);
    }

    return (
        <ul className={c(adminNavStyles.navigation, styles.navigation, props.className)}>
            {routes.map(({ query, title }, i) => (
                <li
                    onClick={updateStatusHandler(query.status)}
                    key={i}
                    className={c(adminNavStyles.menuItem, c({ [adminNavStyles.active]: props.currentStatus === query.status }))}
                >
                    {title}
                </li>
            ))}
        </ul>
    );
}

export default PaymentRequestsNavigation;
