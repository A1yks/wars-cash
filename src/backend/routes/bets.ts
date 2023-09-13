import BetsController from '@backend/controllers/bets';
import { placeBetSchema } from '@backend/controllers/bets/validation';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.post('/', TokensMiddleware.verifyAcessToken, ValidationMiddleware.validate(placeBetSchema), BetsController.placeBet);

export default router;
