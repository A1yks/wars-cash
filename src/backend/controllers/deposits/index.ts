import { handleServerErrors } from '@backend/utils/errorsHandler';
import { GetDepositsFilter, GetDepositsReq } from './types';
import { depositFilterSchema } from './validation';
import DepositsService from '@backend/services/deposit';

namespace DepositsController {
    export const addDeposit = handleServerErrors(async (req, res) => {
        // TODO
    });

    export const getDeposits = handleServerErrors<void, void, GetDepositsReq>(async (req, res) => {
        const { filter: encodedFilter, limit = 20, offset = 0 } = req.query;
        const userId = req.query.userId || req.userId;
        let filter: GetDepositsFilter = { date: -1 };

        if (encodedFilter !== undefined) {
            filter = await depositFilterSchema.validate(JSON.parse(decodeURIComponent(encodedFilter)));
        }

        const data = await DepositsService.getDeposits(limit, offset, filter, userId);

        res.status(200).json({ data });
    });
}

export default DepositsController;
