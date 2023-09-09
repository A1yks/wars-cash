import useAppSelector from 'hooks/useAppSelector';
import { AuthCheckerProps } from './AuthChecker.type';
import PageLoader from 'components/PageLoader';
import useBrowserLayoutEffect from 'hooks/useBrowserLayoutEffect';
import { useRouter } from 'next/router';

function AuthChecker(props: AuthCheckerProps) {
    const { user, isLoading, isLoginCompleted } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const getLayout = props.children?.props?.children?.type?.getLayout;
    const isProtectedRoute =
        props.children.type.isProtectedRoute !== undefined || props.children?.props?.children?.type?.isProtectedRoute !== undefined;

    useBrowserLayoutEffect(() => {
        if (user === null && !isLoading && isLoginCompleted) {
            router.push('/');
        }
    }, [user, isLoading]);

    if (isProtectedRoute && isLoading) {
        if (getLayout !== undefined) {
            return getLayout(<PageLoader />);
        }

        return <PageLoader />;
    }

    return <>{props.children}</>;
}

export default AuthChecker;
