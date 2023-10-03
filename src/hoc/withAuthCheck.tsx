import { NextPage } from 'next';
import getInitialPageProps from 'utils/getInitialPageProps';

function withAuthCheck<T extends Record<string, unknown>>(
    Component: NextPage<T> & { getLayout?: (page: React.ReactNode) => React.ReactNode },
    clientOnly = false
) {
    function WrapperComponent(props: T) {
        return <Component {...props} />;
    }

    WrapperComponent.isProtectedRoute = true;

    WrapperComponent.getLayout = Component.getLayout;

    if (!clientOnly) {
        WrapperComponent.getInitialProps = getInitialPageProps(async (store, ctx) => {
            try {
                const { res } = ctx;
                const { user } = store.getState();

                if (user === null) {
                    res?.writeHead(302, {
                        Location: '/',
                    }).end();
                }

                const data = await Component.getInitialProps?.(ctx);

                return { ...data };
            } catch (err) {
                console.error(err);
            }

            return {};
        });
    }

    return WrapperComponent;
}

export default withAuthCheck;
