import PagesList from 'components/PagesList';
import PageEditor from './PageEditor';
import styles from './PagesEditorContent.module.scss';
import usePagesEditorContent from './hooks/usePagesEditorContent';
import PageLoader from 'components/PageLoader';
import Spinner from 'components/Spinner/Spinner';

function PagesEditorContent() {
    const { isGettingPagesInfo, isGettingPageContent, activePage, pagesListItems, activePageIndex } = usePagesEditorContent();

    if (isGettingPagesInfo) {
        return <PageLoader />;
    }

    return (
        <div className={styles.content}>
            <PagesList pages={pagesListItems} activeIndex={activePageIndex} className={styles.pagesList} />
            {isGettingPageContent ? <Spinner /> : <PageEditor page={activePage} />}
        </div>
    );
}

export default PagesEditorContent;
