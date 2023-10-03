import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export function isApiError(error: unknown): error is API.ErrorResponse {
    const err = (error as API.ErrorResponse)?.error;

    return typeof err === 'string';
}

export function hasMessage(error: unknown): error is { message: string } {
    return error !== null && typeof error === 'object' && Object.hasOwn(error, 'message');
}

export function extractError(err: unknown) {
    if (isFetchBaseQueryError(err)) {
        const data = err.data;

        if (isApiError(data)) {
            return data.error;
        }
    }

    if (isApiError(err)) {
        return err.error;
    }

    if (hasMessage(err) || err instanceof Error) {
        return err.message;
    }

    return '';
}
