import { handleServerErrors } from '@backend/utils/errorsHandler';
import { ChangePaymentStatusReq, CreatePaymentReq, GetPaymentsReq } from './types';
import PaymentsService from '@backend/services/payments';

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
        const { allPayments } = req.query;
        const userId = req.query.userId || req.userId;

        const payments = await PaymentsService.getPayments(allPayments ? undefined : userId);

        res.status(200).json({ data: payments });
    });
}

export default PaymentsController;
