import c from 'clsx';
import styles from './PageLoader.module.scss';
import Spinner from 'components/Spinner/Spinner';
import Head from 'next/head';

function PageLoader() {
    return (
        <div className={c(styles.loader, 'flex', 'center')}>
            <Head>
                <title>Загрузка...</title>
            </Head>
            <Spinner />
        </div>
    );
}

export default PageLoader;
