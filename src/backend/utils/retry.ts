import { ErrorTypes } from '../enums/errors';
import wait from './wait';

type Callback = (lastError: Error | null) => MaybePromise<unknown>;

type RetryConfig = {
    count?: number;
    timeout?: number;
    onRetry?: (error: Error | null) => MaybePromise<unknown>;
    onError?: (error: Error | null) => MaybePromise<unknown>;
    logger?: Console;
    errMsg?: string;
    showTryNumber?: boolean;
    throwOn?: ErrorTypes[];
};

export function createRetry(config?: RetryConfig) {
    return async <T extends Callback>(callback: T, configOverrides?: RetryConfig) => {
        return await retry(callback, { ...config, ...configOverrides });
    };
}

async function retry<T extends Callback>(callback: T, config?: RetryConfig) {
    const { count = 2, timeout, logger, errMsg, showTryNumber = true, throwOn = [], onRetry, onError } = config || {};

    let error: Error | null = null;

    for (let i = 0; i < count; i++) {
        try {
            if (error !== null) {
                await onRetry?.(error);
            }

            return (await callback(error)) as Awaited<ReturnType<T>>;
        } catch (err) {
            let msg = errMsg;
            let throwImmediately = false;

            if (err instanceof Error) {
                msg = err.message;

                if (throwOn.includes(err.cause as ErrorTypes)) {
                    throwImmediately = true;
                }
            }

            if (typeof err === 'string') {
                msg = err;
            }

            error = new Error(msg, { cause: ErrorTypes.RETRY_LIMIT_REACHED });

            logger?.log(
                msg
                    ? msg + (!throwImmediately && showTryNumber ? ` (попытка ${i + 1}/${count})` : '')
                    : `Не удалось выполнить последнее действие (попытка ${i + 1}/${count})${
                          i === count - 1 ? '' : timeout === undefined ? ', попытка повтора... ' : `, новая попытка через ${timeout / 1000} сек...`
                      }`
            );

            await onError?.(error);

            if (throwImmediately) {
                throw err;
            }

            if (timeout !== undefined) {
                await wait(timeout);
            }
        }
    }

    throw error;
}

export default retry;
