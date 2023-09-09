import { NextFunction } from 'express';
import { ObjectSchema } from 'yup';
import { ValidationConfig } from './types';

namespace ValidationMiddleware {
    export function validate(
        schema: ObjectSchema<any>,
        config: ValidationConfig = { validateBody: true, validateParams: false, validateQuery: false }
    ) {
        return async function (req: Server.Request, res: Server.Response, next: NextFunction) {
            try {
                await schema.validate(
                    config.validateBody ? req.body : config.validateParams ? req.params : config.validateQuery ? req.query : req.body
                );
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
            }

            next();
        };
    }
}

export default ValidationMiddleware;
