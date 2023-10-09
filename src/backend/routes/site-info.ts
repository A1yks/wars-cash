import SiteInfoController from '@backend/controllers/site-info';
import { changePageContentSchema, getPageContentSchema } from '@backend/controllers/site-info/validation';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get('/', SiteInfoController.getPagesInfo);

router.get('/:type', ValidationMiddleware.validate(getPageContentSchema, { validateParams: true }), SiteInfoController.getPageContent);

router.patch(
    '/change',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(changePageContentSchema),
    SiteInfoController.changePageContent
);

export default router;
