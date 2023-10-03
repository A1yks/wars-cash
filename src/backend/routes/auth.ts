import AuthController from '@backend/controllers/auth';
import { registerSchema } from '@backend/controllers/auth/validation';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.post('/', ValidationMiddleware.validate(registerSchema), TokensMiddleware.verifyProviderToken, AuthController.authenticate);

router.post('/logout', TokensMiddleware.verifyAcessToken, AuthController.logout);

export default router;
