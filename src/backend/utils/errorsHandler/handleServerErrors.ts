import { NextFunction } from 'express';
import errorsHandler, { Configuration } from './errorsHandler';

function handleServerErrors<Body = unknown, Params = unknown, QueryParams = unknown>(
    callback: (req: Server.Request<Body, Params, QueryParams>, res: Server.Response, next: NextFunction) => unknown,
    config?: Omit<Configuration, 'res'>
) {
    return async (req: Server.Request<Body, Params, QueryParams>, res: Server.Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла непредвиденная ошибка при попытке выполнить операцию',
                ...config,
            });
        }
    };
}

export default handleServerErrors;
