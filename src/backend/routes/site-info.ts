import { canPerformAdminActions } from '@backend/common/permissions';
import SiteInfoController from '@backend/controllers/site-info';
import { changePageContentSchema, getPageContentSchema } from '@backend/controllers/site-info/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get('/', TokensMiddleware.verifyAcessToken, PermissionsMiddleware.check(canPerformAdminActions), SiteInfoController.getPagesInfo);

router.get('/:type', ValidationMiddleware.validate(getPageContentSchema, { validateParams: true }), SiteInfoController.getPageContent);

router.patch(
    '/change',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(changePageContentSchema),
    SiteInfoController.changePageContent
);

export default router;
