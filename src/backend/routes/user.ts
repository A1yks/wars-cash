import UserController from '@backend/controllers/user';
import { changeNameSchema } from '@backend/controllers/user/validation';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.patch('/change/name', TokensMiddleware.verifyAcessToken, ValidationMiddleware.validate(changeNameSchema), UserController.changeName);

router.patch('/change/avatar', TokensMiddleware.verifyAcessToken, UserController.changeAvatar);

export default router;
