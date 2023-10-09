import { adminRoles } from '@backend/models/User/types';
import { NextPage } from 'next';
import getInitialPageProps from 'utils/getInitialPageProps';

function withAuthCheck<T extends Record<string, unknown>>(
    Component: NextPage<T> & { getLayout?: (page: React.ReactNode) => React.ReactNode },
    checkAdmin = false
) {
    function WrapperComponent(props: T) {
        return <Component {...props} />;
    }

    WrapperComponent.isProtectedRoute = true;

    WrapperComponent.getLayout = Component.getLayout;

    WrapperComponent.getInitialProps = getInitialPageProps(async (store, ctx) => {
        try {
            const { res } = ctx;
            const { user } = store.getState();

            if (user === null || (checkAdmin && !adminRoles.includes(user.role))) {
                res?.writeHead(302, {
                    Location: '/',
                }).end();
            }

            if (user?.isBanned) {
                res?.writeHead(302, {
                    Location: '/blocked',
                }).end();
            }

            const data = await Component.getInitialProps?.(ctx);

            return { ...data };
        } catch (err) {
            console.error(err);
        }

        return {};
    });

    return WrapperComponent;
}

export default withAuthCheck;
