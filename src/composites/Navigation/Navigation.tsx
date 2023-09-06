import c from 'clsx';
import styles from './Navigation.module.scss';
import { User } from 'types/global';
import Link from 'components/Link/Link';
import UserCard from 'components/UserCard';
import { Modal, ModalOpener } from 'components/Modal';
import AppModalBody from 'components/AppModalBody';
import DepositContent from 'features/DepositContent';
import WithdrawalContent from 'features/WithdrawalContent';
import BonusContent from 'features/BonusContent';
import FaqContent from 'features/FaqContent';
import { useCallback, useMemo } from 'react';
import Burger from 'components/Burger/Burger';
import Menu from 'components/Menu';
import useNavigation from './hooks/useNavigation';

export type NavigationProps = {
    user: User | null;
    className?: string;
    onLogin: () => void;
    onLogout: () => void;
};

function Navigation(props: NavigationProps) {
    const { user, className } = props;
    const { isLoggedIn, isMenuOpened, openMenu, closeMenu, toggleMenu, loginClickHandler, logoutClickHandler } = useNavigation(props);

    const menuJsx = useMemo(
        () => (
            <>
                <li className={styles.menuItem}>
                    <Link href="/" onClick={closeMenu}>
                        Главная
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/user/profile" onClick={closeMenu}>
                        Личный кабинет
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Modal>
                        <AppModalBody title="Пополнение">
                            <DepositContent />
                        </AppModalBody>
                        <ModalOpener>
                            <Link href="#">Пополнение</Link>
                        </ModalOpener>
                    </Modal>
                </li>
                <li className={styles.menuItem}>
                    <Modal>
                        <AppModalBody title="Вывод">
                            <WithdrawalContent />
                        </AppModalBody>
                        <ModalOpener>
                            <Link href="#">Вывод</Link>
                        </ModalOpener>
                    </Modal>
                </li>
                <li className={styles.menuItem}>
                    <Modal>
                        <AppModalBody title="Бонус">
                            <BonusContent />
                        </AppModalBody>
                        <ModalOpener>
                            <Link href="#">Бонус</Link>
                        </ModalOpener>
                    </Modal>
                </li>
                <li className={styles.menuItem}>
                    <Modal>
                        <AppModalBody title="FAQ">
                            <FaqContent />
                        </AppModalBody>
                        <ModalOpener>
                            <Link href="#">FAQ</Link>
                        </ModalOpener>
                    </Modal>
                </li>
                <li className={styles.menuItem}>
                    <Link href="#" className={styles.logout} onClick={logoutClickHandler}>
                        Выход
                    </Link>
                </li>
            </>
        ),
        [closeMenu, logoutClickHandler]
    );

    return (
        <nav className={c(styles.nav, className)}>
            {isLoggedIn && <UserCard name={user!.name} avatarSrc={user!.avatar} profileUrl="/user/profile" className={styles.desktopUserCard} />}
            {isLoggedIn ? (
                <>
                    <Burger isOpened={isMenuOpened} className={styles.burger} onClick={toggleMenu} />
                    <Menu isOpened={isMenuOpened} onClose={closeMenu}>
                        <UserCard
                            name={user!.name}
                            avatarSrc={user!.avatar}
                            profileUrl="/user/profile"
                            className={styles.mobileUserCard}
                            onClick={closeMenu}
                        />
                        <ul className={c(styles.menu, styles.burgerMenu)}>{menuJsx}</ul>
                    </Menu>
                </>
            ) : (
                <ul className={c(styles.menu, styles.mobileMenu)}>
                    <li>
                        <Link href="#" className={styles.login} onClick={loginClickHandler}>
                            Авторизация
                        </Link>
                    </li>
                </ul>
            )}
            <ul className={c(styles.menu, styles.desktopMenu)}>
                {isLoggedIn ? (
                    menuJsx
                ) : (
                    <li>
                        <Link href="#" className={styles.login} onClick={loginClickHandler}>
                            Авторизация
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
