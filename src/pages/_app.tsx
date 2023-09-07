import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { wrapper } from 'store';
import AuthChecker from 'features/AuthChecker';
import 'react-circular-progressbar/dist/styles.css';
import 'simplebar-react/dist/simplebar.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/global.scss';

type WrapperResult = Omit<ReturnType<(typeof wrapper)['useWrappedStore']>, 'props'> & { props: AppProps };

function MyApp({ Component, ...rest }: AppProps) {
    const {
        store,
        props: { pageProps },
    } = wrapper.useWrappedStore(rest) as WrapperResult;

    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <AuthChecker>
                    <Component {...pageProps} />
                </AuthChecker>
            </SnackbarProvider>
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
