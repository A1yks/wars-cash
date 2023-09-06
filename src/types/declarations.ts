import express from 'express';
import { Types } from 'mongoose';
import { ReactNode } from 'react';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    namespace API {
        type Response<T = unknown> = {
            data: T;
        };

        type ErrorResponse = {
            error: string;
        };
    }

    namespace Props {
        type WithChildren = {
            children: ReactNode;
        };
    }
}

export {};
