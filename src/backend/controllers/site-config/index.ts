import SiteConfigService from '@backend/services/site-config';
import { handleServerErrors } from '@backend/utils/errorsHandler';
import { ChangeSiteConfigReq } from './types';

namespace SiteConfigController {
    export const getPublicConfig = handleServerErrors(async (req, res) => {
        const config = await SiteConfigService.getPublicConfig();

        res.status(200).json({ data: config });
    });

    export const getFullConfig = handleServerErrors(async (req, res) => {
        const config = await SiteConfigService.getConfig();

        res.status(200).json({ data: config });
    });

    export const changeConfig = handleServerErrors<ChangeSiteConfigReq>(async (req, res) => {
        const updatedConfig = await SiteConfigService.updateConfig(req.body);

        res.status(200).json({ data: updatedConfig });
    });
}

export default SiteConfigController;
