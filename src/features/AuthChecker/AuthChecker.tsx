import useAppSelector from 'hooks/useAppSelector';
import { AuthCheckerProps } from './AuthChecker.type';
import PageLoader from 'components/PageLoader';
import useBrowserLayoutEffect from 'hooks/useBrowserLayoutEffect';
import { useRouter } from 'next/router';
import { AppState } from 'store';
import { createSelector } from '@reduxjs/toolkit';
import { authDataSelector, userSelector } from 'store/selectors';
import BlockedUserContent from 'features/BlockedUserContent';
import { SiteInfoTypes, siteInfoTypes } from '@backend/models/SiteInfo/types';

const selectAuthAndUser = createSelector([authDataSelector, userSelector], (auth, user) => ({ ...auth, user }));

function AuthChecker(props: AuthCheckerProps) {
    const { user, isLoading, isLoginCompleted } = useAppSelector(selectAuthAndUser);
    const router = useRouter();
    const getLayout = props.children?.props?.children?.type?.getLayout;
    const isProtectedRoute =
        props.children.type.isProtectedRoute !== undefined || props.children?.props?.children?.type?.isProtectedRoute !== undefined;

    useBrowserLayoutEffect(() => {
        if (user === null && !isLoading && isLoginCompleted) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isProtectedRoute && isLoading) {
        if (getLayout !== undefined) {
            return getLayout(<PageLoader />);
        }

        return <PageLoader />;
    }

    if (user?.isBanned && !siteInfoTypes.includes(router.query.type as SiteInfoTypes)) {
        return getLayout(<BlockedUserContent />);
    }

    return <>{props.children}</>;
}

export default AuthChecker;
