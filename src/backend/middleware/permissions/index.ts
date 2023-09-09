import { ErrorTypes } from '@backend/enums/errors';
import { errorsHandler } from '@backend/utils/errorsHandler';
import { NextFunction } from 'express';

export type PermissionsValidationCallback = (req: Server.Request) => boolean | Promise<boolean>;

namespace PermissionsMiddleware {
    export function check(callback: PermissionsValidationCallback) {
        return async function (req: Server.Request, res: Server.Response, next: NextFunction) {
            const userId = req.userId;

            if (userId === undefined) {
                return res.status(401).json({ error: 'Provided access token is invalid' });
            }

            try {
                const result = await callback(req);

                if (result) {
                    next();
                } else {
                    res.status(403).json({ error: "You don't have permissions to perform this operation" });
                }
            } catch (err) {
                errorsHandler(err, {
                    res,
                    unexpectedErrMsg: 'An unexpected error occured while checking user permissions',
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
