import UserController from '@backend/controllers/user';
import { loginSchema } from '@backend/controllers/user/validation';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.post('/login', ValidationMiddleware.validate(loginSchema), UserController.login);

export default router;
