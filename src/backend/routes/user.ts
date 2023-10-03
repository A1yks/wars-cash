import { canPerformAdminActions } from '@backend/common/permissions';
import UserController from '@backend/controllers/user';
import { canRestrictUserAccess } from '@backend/controllers/user/permissions';
import { changeBalanceSchema, changeNameSchema, getUsersSchema, restrictAccessSchema } from '@backend/controllers/user/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.patch('/change/name', TokensMiddleware.verifyAcessToken, ValidationMiddleware.validate(changeNameSchema), UserController.changeName);

router.patch('/change/avatar', TokensMiddleware.verifyAcessToken, UserController.changeAvatar);

router.patch(
    '/restrict',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(restrictAccessSchema),
    PermissionsMiddleware.check(canRestrictUserAccess),
    UserController.restrictAccess
);

router.get(
    '/',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(getUsersSchema, { validateQuery: true }),
    PermissionsMiddleware.check(canPerformAdminActions),
    UserController.getUsers
);

router.patch(
    '/change/balance',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(changeBalanceSchema),
    PermissionsMiddleware.check(canPerformAdminActions),
    UserController.changeBalance
);

export default router;
