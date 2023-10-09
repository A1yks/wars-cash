import BonusService from '@backend/services/bonus';
import { handleServerErrors } from '@backend/utils/errorsHandler';

namespace BonusController {
    export const getBonusInfo = handleServerErrors(async (req, res) => {
        const bonusInfo = await BonusService.getBonusInfo(req.userId);

        res.status(200).json({ data: bonusInfo });
    });

    export const claimBonus = handleServerErrors(async (req, res) => {
        const data = await BonusService.claimBonus(req.userId);

        res.status(200).json({ data });
    });
}

export default BonusController;
