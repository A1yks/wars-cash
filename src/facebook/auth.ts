import { store } from 'store';
import { authApi } from 'store/api/auth';
import authSlice from 'store/reducers/authSlice';

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
                    console.log(123);
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
}

export async function checkAuth() {
    store.dispatch(authSlice.actions.setIsLoading(true));
    store.dispatch(authSlice.actions.setIsLoginCompleted(false));

    return await checkLoginStatus().then(async (response) => {
        if (response.status === 'connected') {
            const fbLoginData = await getUserInfo();

            if (isFacebookLoginError(fbLoginData)) {
                store.dispatch(authSlice.actions.setIsLoading(false));
                store.dispatch(authSlice.actions.setIsLoginCompleted(true));
                throw new Error('Произошла ошибка при авторизации через facebook');
            }

            await store.dispatch(
                authApi.endpoints.login.initiate({
                    facebookId: fbLoginData.id,
                    name: fbLoginData.name,
                    avatar: fbLoginData.picture.data.url,
                })
            );

            return true;
        }

        store.dispatch(authSlice.actions.setIsLoading(false));
        store.dispatch(authSlice.actions.setIsLoginCompleted(true));
        return false;
    });
}
