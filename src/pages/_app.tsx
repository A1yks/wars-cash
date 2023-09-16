import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { wrapper } from 'store';
import AuthChecker from 'features/AuthChecker';
import Script from 'next/script';
import 'react-circular-progressbar/dist/styles.css';
import 'simplebar-react/dist/simplebar.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/global.scss';
import 'facebook/init';
import { NextComponentType } from 'next';
import { ReactElement } from 'react';
import { AuthCheckerProps } from 'features/AuthChecker/AuthChecker.type';
import { getAccessToken } from 'store/api/auth';
import { getRunningQueriesThunk } from 'store/api';
import App from 'next/app';
import { SocketContextProvider } from 'context/SocketContext';
import { loadLastGamesHelper } from 'initialPropsHelpers/loadLastGames';

type WrapperResult = Omit<ReturnType<(typeof wrapper)['useWrappedStore']>, 'props'> & { props: AppProps };

function MyApp({ Component, ...rest }: AppProps) {
    const {
        store,
        props: { pageProps },
    } = wrapper.useWrappedStore(rest) as WrapperResult;

    const getLayout =
        (Component as typeof Component & { getLayout: (page: ReactElement) => AuthCheckerProps['children'] }).getLayout ||
        ((page: NextComponentType) => page);

    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3} classes={{ root: 'snackbar-content', containerRoot: 'snackbar-content' }}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <SocketContextProvider>
                    <AuthChecker>{getLayout(<Component {...pageProps} />)}</AuthChecker>
                </SocketContextProvider>
            </SnackbarProvider>
            <Script src="https://connect.facebook.net/en_US/sdk.js" async />
        </Provider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
    const { ctx } = appContext;

    if (ctx.req !== undefined) {
        try {
            const { data: response, error } = await store.dispatch(getAccessToken.initiate(ctx.req.headers.cookie || ''));

            if (error) {
                console.log(error);
            }

            if (response !== undefined) {
                const {
                    data: { cookie },
                } = response;

                if (cookie !== undefined) {
                    ctx.res?.setHeader('set-cookie', cookie);
                }
            }

            await loadLastGamesHelper(store);
            await Promise.all(store.dispatch(getRunningQueriesThunk()));

            const componentProps = await App.getInitialProps(appContext);

            return {
                pageProps: {
                    ...componentProps.pageProps,
                },
            };
        } catch (err) {
            console.error(err);
        }
    }

    return { pageProps: {} };
});

export default MyApp;
