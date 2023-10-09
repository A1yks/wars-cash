import BonusController from '@backend/controllers/bonus';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.get('/info', TokensMiddleware.verifyAcessToken, BonusController.getBonusInfo);

router.get('/claim', TokensMiddleware.verifyAcessToken, BonusController.claimBonus);

export default router;
