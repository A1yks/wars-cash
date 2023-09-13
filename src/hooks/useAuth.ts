import { checkAuth, login as loginToFB, logout as logoutFromFB } from 'facebook/auth';
import useErrorsHandler from './useErrorsHandler';
import { useRouter } from 'next/router';
import { useLogoutMutation } from 'store/api/auth';
import useAppDispatch from './useAppDispatch';
import authSlice from 'store/reducers/authSlice';
import userSlice from 'store/reducers/userSlice';

const { setAuth } = authSlice.actions;
const { setUser } = userSlice.actions;

function useAuth() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logoutMutation] = useLogoutMutation();

    const loginHandler = useErrorsHandler(async () => {
        const isLoggedIn = await checkAuth();

        if (!isLoggedIn) {
            await loginToFB();
            await checkAuth();
        }
    });

    const logoutHandler = useErrorsHandler(async () => {
        await logoutMutation().unwrap();
        dispatch(setAuth(authSlice.getInitialState()));
        dispatch(setUser(userSlice.getInitialState()));
        router.push('/');
    });

    return { loginHandler, logoutHandler };
}

export default useAuth;
