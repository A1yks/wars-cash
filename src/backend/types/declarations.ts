import express from 'express';
import { Types } from 'mongoose';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    namespace Server {
        export type ResponseBody<T = any> = { data: T; error?: never } | { error: string; data?: never };

        export interface Request<Body = any, Params = any, QueryParams = any> extends express.Request<Params, any, any, QueryParams> {
            body: Body;
            userId?: Types.ObjectId;
        }

        export type Response<T = any> = express.Response<ResponseBody<T>>;
    }
}

export {};
