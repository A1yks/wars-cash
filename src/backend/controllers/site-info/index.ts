import SiteInfoService from '@backend/services/site-info';
import { handleServerErrors } from '@backend/utils/errorsHandler';
import { ChangePageContentReq, GetPageContentReq } from './types';

namespace SiteInfoController {
    export const getPagesInfo = handleServerErrors(async (req, res) => {
        const pages = await SiteInfoService.getPagesInfo();

        res.status(200).json({ data: pages });
    });

    export const getPageContent = handleServerErrors<void, GetPageContentReq>(async (req, res) => {
        const { type } = req.params;

        const page = await SiteInfoService.getPage(type);

        res.status(200).json({ data: page });
    });

    export const changePageContent = handleServerErrors<ChangePageContentReq>(async (req, res) => {
        const { type, data } = req.body;

        const updatedPage = await SiteInfoService.updatePage(type, data);

        res.status(200).json({ data: updatedPage });
    });
}

export default SiteInfoController;
