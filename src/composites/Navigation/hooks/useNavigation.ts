import { useCallback } from 'react';
import { NavigationProps } from '../Navigation';
import useBooleanState from 'hooks/useBooleanState';

function useNavigation(props: NavigationProps) {
    const { user, onLogin, onLogout } = props;
    const isLoggedIn = user !== null;
    const [isMenuOpened, openMenu, closeMenu, toggleMenu] = useBooleanState();

    function loginClickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        onLogin();
    }

    const logoutClickHandler = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            closeMenu();
            onLogout();
        },
        [closeMenu, onLogout]
    );

    return { isLoggedIn, isMenuOpened, openMenu, closeMenu, toggleMenu, loginClickHandler, logoutClickHandler };
}

export default useNavigation;
