import DepositsController from '@backend/controllers/deposits';
import { canGetDeposits } from '@backend/controllers/deposits/permissions';
import { getDepositsSchema } from '@backend/controllers/deposits/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get(
    '/',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(getDepositsSchema, { validateQuery: true }),
    PermissionsMiddleware.check(canGetDeposits),
    DepositsController.getDeposits
);

export default router;
