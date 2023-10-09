import Container from 'components/Container';
import PageLoader from 'components/PageLoader';
import { useRouter } from 'next/router';
import { useGetDeletionInfoQuery } from 'store/api/facebook';
import { extractError } from 'utils/extractError';
import styles from './FacebookDeletionInfoContent.module.scss';

function FacebookDeletionInfoContent() {
    const router = useRouter();
    const code = router.query.code as string;
    const { data: response, isLoading, isError, error } = useGetDeletionInfoQuery(code);
    const status = response?.data.status;

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError) {
        return (
            <Container>
                <div className={styles.info}>{extractError(error)}</div>
            </Container>
        );
    }

    if (status === undefined) {
        return (
            <Container>
                <div className={styles.info}>Произошла ошибка при получении статуса</div>
            </Container>
        );
    }

    return (
        <Container>
            <div className={styles.info}>Статус: {status}</div>
        </Container>
    );
}

export default FacebookDeletionInfoContent;
