'use client';
import c from 'clsx';
import styles from './PageLoader.module.scss';
import Spinner from 'components/Spinner/Spinner';

function PageLoader() {
    return (
        <div className={c(styles.loader, 'flex', 'center')}>
            <Spinner />
        </div>
    );
}

export default PageLoader;
