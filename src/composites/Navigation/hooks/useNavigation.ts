import { useCallback } from 'react';
import { NavigationProps } from '../Navigation';
import useBooleanState from 'hooks/useBooleanState';

function useNavigation(props: NavigationProps) {
    const { user, onLogin, onLogout } = props;
    const isLoggedIn = user !== null;
    const [isMenuOpened, openMenu, closeMenu, toggleMenu] = useBooleanState();

    async function loginHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        await onLogin();
    }

    const logoutHandler = useCallback(async () => {
        closeMenu();
        await onLogout();
    }, [closeMenu, onLogout]);

    return { isLoggedIn, isMenuOpened, openMenu, closeMenu, toggleMenu, loginHandler, logoutHandler };
}

export default useNavigation;
