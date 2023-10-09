import c from 'clsx';
import styles from './CustomPageContent.module.scss';
import { SiteInfoTypes, siteInfoTypes } from '@backend/models/SiteInfo/types';
import useAppSelector from 'hooks/useAppSelector';
import { useRouter } from 'next/router';
import Container from 'components/Container';
import { useGetPageContentQuery } from 'store/api/siteInfo';
import PageLoader from 'components/PageLoader';
import Head from 'next/head';

function CustomPageContent() {
    const router = useRouter();
    const pageType = router.query.type as SiteInfoTypes;
    const { isLoading } = useGetPageContentQuery(pageType);
    const { content, title } = useAppSelector((state) => state.siteInfo.pages[pageType]) || {};

    if (isLoading) {
        return <PageLoader />;
    }

    if (!siteInfoTypes.includes(pageType)) {
        return (
            <Container className={c('flex', 'center')}>
                <Head>
                    <title>Страница не найдена | Wars.Cash</title>
                </Head>
                <div className={c(styles.content, styles.error)}>Страница не найдена</div>
            </Container>
        );
    }

    if (content === undefined) {
        return (
            <Container className={c('flex', 'center')}>
                <Head>
                    <title>Ошибка | Wars.Cash</title>
                </Head>
                <div className={c(styles.content, styles.error)}>Произошла ошибка при загрузке страницы</div>
            </Container>
        );
    }

    const pageTitle = `${title} | Wars.Cash`;

    return (
        <Container>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
    );
}

export default CustomPageContent;
