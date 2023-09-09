import { checkAuth, login as loginToFB, logout } from 'facebook/auth';
import useErrorsHandler from './useErrorsHandler';
import { useRouter } from 'next/router';

function useAuth() {
    const router = useRouter();

    const loginHandler = useErrorsHandler(async () => {
        const isLoggedIn = await checkAuth();

        if (!isLoggedIn) {
            await loginToFB();
            await checkAuth();
        }
    });

    const logoutHandler = useErrorsHandler(async () => {
        await logout();
        router.push('/');
    });

    return { loginHandler, logoutHandler };
}

export default useAuth;
