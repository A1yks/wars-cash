import FacebookController from '@backend/controllers/facebook';
import { getDeletionInfoSchema } from '@backend/controllers/facebook/validation';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get('/deletion', ValidationMiddleware.validate(getDeletionInfoSchema, { validateQuery: true }), FacebookController.getDeletionInfo);

export default router;
