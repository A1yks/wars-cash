import { handleServerErrors } from '@backend/utils/errorsHandler';
import { GetFbDeletionInfoReq } from './types';
import FacebookService from '@backend/services/facebook';

namespace FacebookController {
    export const getDeletionInfo = handleServerErrors<void, void, GetFbDeletionInfoReq>(async (req, res) => {
        const { code } = req.query;

        const info = await FacebookService.getDeletionInfo(code);

        res.status(200).json({ data: info });
    });
}

export default FacebookController;
