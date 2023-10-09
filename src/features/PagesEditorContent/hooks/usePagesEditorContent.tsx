import { SiteInfoTypes, siteInfoTypes } from '@backend/models/SiteInfo/types';
import useAppSelector from 'hooks/useAppSelector';
import { useRouter } from 'next/router';
import { useGetPageContentQuery, useGetPagesInfoQuery } from 'store/api/siteInfo';

type RouterQuery = {
    page?: SiteInfoTypes;
};

function usePagesEditorContent() {
    const router = useRouter();
    const { page } = router.query as RouterQuery;
    const activePageIndex = page === undefined ? 0 : siteInfoTypes.indexOf(page);
    const { isLoading: isGettingPagesInfo } = useGetPagesInfoQuery();
    const { isFetching: isGettingPageContent } = useGetPageContentQuery(siteInfoTypes[activePageIndex]);
    const pages = useAppSelector((state) => state.siteInfo.pages);
    const pagesValues = Object.values(pages);
    const pagesListItems = pagesValues.map((page) => ({ title: page.title, href: { query: { page: page.type } } }));
    const activePage = pagesValues[activePageIndex];

    return { isGettingPagesInfo, isGettingPageContent, activePageIndex, activePage, pages, pagesListItems };
}

export default usePagesEditorContent;
