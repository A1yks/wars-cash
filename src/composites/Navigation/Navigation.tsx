import c from 'clsx';
import styles from './Navigation.module.scss';
import Link from 'components/Link/Link';
import UserCard from 'components/UserCard';
import { Modal, ModalOpener } from 'components/Modal';
import AppModalBody from 'components/AppModalBody';
import DepositContent from 'features/DepositContent';
import WithdrawalContent from 'features/WithdrawalContent';
import BonusContent from 'features/BonusContent';
import FaqContent from 'features/FaqContent';
import { useMemo } from 'react';
import Burger from 'components/Burger/Burger';
import Menu from 'components/Menu';
import useNavigation from './hooks/useNavigation';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDIalog';
import { IUser, Roles, adminRoles } from '@backend/models/User/types';
import Spinner from 'components/Spinner/Spinner';

export type NavigationProps = {
    user: IUser | null;
    className?: string;
    onLogin: () => MaybePromise<void>;
    onLogout: () => MaybePromise<void>;
};

function Navigation(props: NavigationProps) {
    const { user, className } = props;
    const { isLoggedIn, isLoggingIn, isMenuOpened, openMenu, closeMenu, toggleMenu, loginHandler, logoutHandler } = useNavigation(props);

    const menuJsx = useMemo(
        () => (
            <>
                {adminRoles.includes(user?.role || Roles.User) && (
                    <li className={styles.menuItem}>
                        <Link href="/admin" onClick={closeMenu}>
                            Админка
                        </Link>
                    </li>
                )}
                <li className={styles.menuItem}>
                    <Link href="/" onClick={closeMenu}>
                        Главная
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/user/profile" onClick={closeMenu}>
                        Профиль
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
                    <ConfirmationDialog content="Вы уверены, что хотите выйти из аккаунта?" onSubmit={logoutHandler}>
                        <ModalOpener>
                            <Link href="#" className={styles.logout}>
                                Выход
                            </Link>
                        </ModalOpener>
                    </ConfirmationDialog>
                </li>
            </>
        ),
        [closeMenu, logoutHandler, user?.role]
    );

    const authBtnJsx = isLoggingIn ? (
        <Spinner />
    ) : (
        <Link href="#" className={styles.login} onClick={loginHandler}>
            Авторизация
        </Link>
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
                            avatarPriority
                        />
                        <ul className={c(styles.menu, styles.burgerMenu)}>{menuJsx}</ul>
                    </Menu>
                </>
            ) : (
                <ul className={c(styles.menu, styles.mobileMenu)}>
                    <li>{authBtnJsx}</li>
                </ul>
            )}
            <ul className={c(styles.menu, styles.desktopMenu)}>{isLoggedIn ? menuJsx : <li>{authBtnJsx}</li>}</ul>
        </nav>
    );
}

export default Navigation;
