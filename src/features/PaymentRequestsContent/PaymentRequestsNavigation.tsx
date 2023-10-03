import c from 'clsx';
import adminNavStyles from 'composites/AdminNavigation/AdminNavigation.module.scss';
import styles from './PaymentRequestsContent.module.scss';
import { useRouter } from 'next/router';
import Link from 'components/Link';

export type PaymentRequestsNavigationProps = {
    className?: string;
};

const routes = [
    {
        title: 'Необработанные заявки',
        query: { status: 'pending' },
    },
    {
        title: 'Отклоненные заявки',
        query: { status: 'rejected' },
    },
    {
        title: 'Обработанные заявки',
        query: { status: 'processed' },
    },
];

function PaymentRequestsNavigation(props: PaymentRequestsNavigationProps) {
    const router = useRouter();

    return (
        <ul className={c(adminNavStyles.navigation, styles.navigation, props.className)}>
            {routes.map(({ query, title }, i) => (
                <li key={i} className={adminNavStyles.menuItem}>
                    <Link
                        href={{ pathname: '/admin/requests', query }}
                        className={c({ [adminNavStyles.active]: router.query.status === query.status })}
                    >
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default PaymentRequestsNavigation;
