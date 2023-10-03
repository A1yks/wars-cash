import { canPerformAdminActions } from '@backend/common/permissions';
import SiteConfigController from '@backend/controllers/site-config';
import { changeSiteConfigSchema } from '@backend/controllers/site-config/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get('/', SiteConfigController.getPublicConfig);

router.get('/full', TokensMiddleware.verifyAcessToken, PermissionsMiddleware.check(canPerformAdminActions), SiteConfigController.getFullConfig);

router.patch(
    '/change',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(changeSiteConfigSchema),
    PermissionsMiddleware.check(canPerformAdminActions),
    SiteConfigController.changeConfig
);

export default router;
