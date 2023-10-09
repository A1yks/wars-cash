import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from 'store';
import { authApi } from 'store/api/auth';
import authSlice from 'store/reducers/authSlice';
import userSlice from 'store/reducers/userSlice';

export type FacebookUserData =
    | {
          id: string;
          name: string;
          picture: {
              data: {
                  height: number;
                  width: number;
                  url: string;
              };
          };
      }
    | { error: string };

export function isFacebookLoginError(data: FacebookUserData): data is { error: string } {
    return 'error' in data;
}

export async function getUserInfo() {
    return new Promise<FacebookUserData>((resolve) => {
        FB.api('/me?fields=name,picture.width(100)', resolve);
    });
}

export async function checkLoginStatus() {
    return new Promise<facebook.StatusResponse>((resolve) => {
        FB.getLoginStatus(resolve);
    });
}

export async function login() {
    return new Promise<FacebookUserData>((resolve, reject) => {
        FB.login(
            (response) => {
                if (response.status === 'connected') {
                    getUserInfo().then(resolve);
                } else {
                    reject(new Error('Авторизация не была завершена'));
                }
            },
            { scope: 'public_profile' }
        );
    });
}

export async function logout() {
    await new Promise<facebook.StatusResponse>((resolve) => {
        FB.logout(resolve);
    });

    store.dispatch(authSlice.actions.setAuth(authSlice.getInitialState()));
    store.dispatch(userSlice.actions.setUser(userSlice.getInitialState()));
}

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { dispatch }) => {
    dispatch(authSlice.actions.setIsLoading(true));
    dispatch(authSlice.actions.setIsLoginCompleted(false));

    return await checkLoginStatus().then(async (response) => {
        if (response.status === 'connected') {
            const fbLoginData = await getUserInfo();

            if (isFacebookLoginError(fbLoginData)) {
                console.log(666);
                dispatch(authSlice.actions.setIsLoading(false));
                dispatch(authSlice.actions.setIsLoginCompleted(true));
                throw new Error('Произошла ошибка при авторизации через facebook');
            }

            await dispatch(
                authApi.endpoints.auth.initiate({
                    provider: 'facebook',
                    providerAccountId: fbLoginData.id,
                    name: fbLoginData.name,
                    avatar: fbLoginData.picture.data.url,
                    token: response.authResponse.accessToken,
                })
            ).unwrap();

            return true;
        }

        dispatch(authSlice.actions.setIsLoading(false));
        // if call these two actions simultaneously for some reason HYDRATE action will be firing indefinitely, so this hack should not be deleted
        setTimeout(() => dispatch(authSlice.actions.setIsLoginCompleted(true)), 0);

        return false;
    });
});
