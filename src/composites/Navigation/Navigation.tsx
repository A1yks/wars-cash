import c from 'clsx';
import styles from './Navigation.module.scss';
import { Roles, User } from 'types/global';
import Link from 'components/Link/Link';
import UserCard from 'components/UserCard';

export type NavigationProps = {
    user: User | null;
    className?: string;
};

function Navigation(props: NavigationProps) {
    const { user, className } = props;
    const isLoggedIn = user !== null;

    return (
        <nav className={c(styles.nav, className)}>
            {isLoggedIn && <UserCard name={user.name} surname={user.surname} avatarSrc={user.avatar} profileUrl="/user/profile" />}
            <ul className={styles.menu}>
                {isLoggedIn ? (
                    <>
                        <li className={styles.menuItem}>
                            <Link href="#">Пополнение</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="#">Вывод</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="#">Бонус</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="#">FAQ</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link href="#" className={styles.logout}>
                                Выход
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href="#" className={styles.login}>
                            Авторизация
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
