import c from 'clsx';
import styles from './AdminNavigation.module.scss';
import Link from 'components/Link';
import { useRouter } from 'next/router';

export type AdminNavigationProps = {
    className?: string;
};

const routes = [
    {
        href: '/admin',
        title: 'Конфигурация',
    },
    {
        href: '/admin/requests',
        query: { status: 'pending' },
        title: 'Просмотр заявок на вывод',
    },
    {
        href: '/admin/users',
        title: 'Пользователи',
    },
    {
        href: '/admin/edit',
        title: 'Редактирование страниц',
    },
];

function AdminNavigation(props: AdminNavigationProps) {
    const router = useRouter();

    return (
        <ul className={c(styles.navigation, props.className)}>
            {routes.map(({ href, title, query }, i) => (
                <li key={i} className={styles.menuItem}>
                    <Link
                        href={{
                            pathname: href,
                            query,
                        }}
                        className={c({ [styles.active]: router.pathname === href })}
                    >
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default AdminNavigation;
