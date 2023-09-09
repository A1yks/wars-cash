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
import { ReactElement, ReactNode } from 'react';
import { AuthCheckerProps } from 'features/AuthChecker/AuthChecker.type';

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
            <SnackbarProvider maxSnack={3}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <AuthChecker>{getLayout(<Component {...pageProps} />)}</AuthChecker>
            </SnackbarProvider>
            <Script src="https://connect.facebook.net/en_US/sdk.js" />
        </Provider>
    );
}

// MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
//     const { ctx } = appContext;

//     if (ctx.req !== undefined) {
//         try {
//             const { data: response } = await store.dispatch(getAccessToken.initiate(ctx.req.headers.cookie || ''));

//             if (response !== undefined) {
//                 const {
//                     data: { cookie },
//                 } = response;

//                 if (cookie !== undefined) {
//                     ctx.res?.setHeader('set-cookie', cookie);
//                 }
//             }

//             await Promise.all(store.dispatch(getRunningQueriesThunk()));

//             const componentProps = await App.getInitialProps(appContext);

//             return {
//                 pageProps: {
//                     ...componentProps.pageProps,
//                 },
//             };
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return { pageProps: {} };
// });

export default MyApp;
