import { handleServerErrors } from '@backend/utils/errorsHandler';
import { ChangePaymentStatusReq, CreatePaymentReq, GetPaymentsFilter, GetPaymentsReq } from './types';
import PaymentsService from '@backend/services/payments';
import { filterSchema } from './validation';

namespace PaymentsController {
    export const createPaymentOrder = handleServerErrors<CreatePaymentReq>(async (req, res) => {
        const data = await PaymentsService.createPaymentOrder(req.userId, req.body);

        res.status(201).json({ data });
    });

    export const changePaymentStatus = handleServerErrors<ChangePaymentStatusReq>(async (req, res) => {
        const { paymentId, status } = req.body;

        const payment = await PaymentsService.changePaymentStatus(paymentId, status);

        res.status(200).json({ data: payment });
    });

    export const getPayments = handleServerErrors<void, void, GetPaymentsReq>(async (req, res) => {
        const { filter: encodedFilter, limit = 20, offset = 0 } = req.query;
        const userId = req.query.userId || req.userId;
        let filter: GetPaymentsFilter = { date: -1 };

        if (encodedFilter !== undefined) {
            filter = await filterSchema.validate(JSON.parse(decodeURIComponent(encodedFilter)));
        }

        const data = await PaymentsService.getPayments(limit, offset, filter, userId);

        res.status(200).json({ data });
    });
}

export default PaymentsController;
