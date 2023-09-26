import PaymentsController from '@backend/controllers/payments';
import { canChangePaymentStatus, canGetPayments } from '@backend/controllers/payments/permissions';
import { changePaymentStatusSchema, createPaymentSchema, getPaymentsSchema } from '@backend/controllers/payments/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get(
    '/',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(getPaymentsSchema, { validateQuery: true }),
    PermissionsMiddleware.check(canGetPayments),
    PaymentsController.getPayments
);

router.post('/create', TokensMiddleware.verifyAcessToken, ValidationMiddleware.validate(createPaymentSchema), PaymentsController.createPaymentOrder);

router.patch(
    '/status/update',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(changePaymentStatusSchema),
    PermissionsMiddleware.check(canChangePaymentStatus),
    PaymentsController.changePaymentStatus
);

export default router;
