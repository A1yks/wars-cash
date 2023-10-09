import c from 'clsx';
import { useGetPageContentQuery } from 'store/api/siteInfo';
import { SiteInfoTypes } from '@backend/models/SiteInfo/types';
import PageLoader from 'components/PageLoader';
import useAppSelector from 'hooks/useAppSelector';
import customPageStyles from 'features/CustomPageContent/CustomPageContent.module.scss';

function FaqContent() {
    const { isLoading, isError } = useGetPageContentQuery(SiteInfoTypes.FAQ);
    const content = useAppSelector((state) => state.siteInfo.pages[SiteInfoTypes.FAQ]?.content);

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError || content === undefined) {
        return <div className={c(customPageStyles.content, customPageStyles.error)}>Произошла ошибка при загрузке страницы</div>;
    }

    return <div className={customPageStyles.content} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default FaqContent;
