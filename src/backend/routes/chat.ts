import { paginationSchema } from '@backend/common/validation';
import ChatController from '@backend/controllers/chat';
import { canDeleteMessage, canGetBannedUsers, canModerate, canSendMessage } from '@backend/controllers/chat/permissions';
import { deleteMessageSchema, moderationSchema, saveMessageSchema } from '@backend/controllers/chat/validation';
import PermissionsMiddleware from '@backend/middleware/permissions';
import TokensMiddleware from '@backend/middleware/tokens';
import ValidationMiddleware from '@backend/middleware/validation';
import { Router } from 'express';

const router = Router();

router.get('/', ChatController.getMessages);

router.get(
    '/users/banned',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(paginationSchema, { validateQuery: true }),
    PermissionsMiddleware.check(canGetBannedUsers),
    ChatController.getBannedUsers
);

router.post(
    '/save',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(saveMessageSchema),
    PermissionsMiddleware.check(canSendMessage),
    ChatController.saveMessage
);

router.patch(
    '/moderate',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(moderationSchema),
    PermissionsMiddleware.check(canModerate),
    ChatController.moderate
);

router.delete(
    '/messages/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteMessageSchema),
    PermissionsMiddleware.check(canDeleteMessage),
    ChatController.deleteMessage
);

export default router;
