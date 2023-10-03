import { useCallback } from 'react';
import { NavigationProps } from '../Navigation';
import useBooleanState from 'hooks/useBooleanState';
import useAppSelector from 'hooks/useAppSelector';

function useNavigation(props: NavigationProps) {
    const { isLoading, isLoginCompleted } = useAppSelector((state) => state.auth);
    const { user, onLogin, onLogout } = props;
    const isLoggedIn = user !== null;
    const [isMenuOpened, openMenu, closeMenu, toggleMenu] = useBooleanState();
    const isLoggingIn = isLoading && !isLoginCompleted;

    async function loginHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        await onLogin();
    }

    const logoutHandler = useCallback(async () => {
        closeMenu();
        await onLogout();
    }, [closeMenu, onLogout]);

    return { isLoggedIn, isLoggingIn, isMenuOpened, openMenu, closeMenu, toggleMenu, loginHandler, logoutHandler };
}

export default useNavigation;
