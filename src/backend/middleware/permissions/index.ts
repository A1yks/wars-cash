import { ErrorTypes } from '@backend/enums/errors';
import { errorsHandler } from '@backend/utils/errorsHandler';
import { NextFunction } from 'express';

export type PermissionsValidationCallback = (req: Server.Request) => boolean | Promise<boolean>;

namespace PermissionsMiddleware {
    export function check(callback: PermissionsValidationCallback) {
        return async function (req: Server.Request, res: Server.Response, next: NextFunction) {
            const userId = req.userId;

            if (userId === undefined) {
                return res.status(401).json({ error: 'Токен доступа невалидный' });
            }

            try {
                const result = await callback(req);

                if (result) {
                    next();
                } else {
                    res.status(403).json({ error: 'У вас нет прав для выполнения данной операции' });
                }
            } catch (err) {
                errorsHandler(err, {
                    res,
                    unexpectedErrMsg: 'Произошла непредвиденная ошибка при проверке прав доступа',
                    expectedErrors: [
                        [ErrorTypes.NOT_FOUND, 404],
                        [ErrorTypes.NO_PERMISSIONS, 403],
                    ],
                });
            }
        };
    }
}

export default PermissionsMiddleware;
