import ChatMessage from '@backend/models/ChatMessage';
import User from '@backend/models/User';
import { IUser, PublicUserData } from '@backend/models/User/types';
import express from 'express';
import { Types } from 'mongoose';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    namespace Express {
        interface Request {
            userId: IUser['_id'];
            permissions: {
                chat: {
                    message?: Omit<InstanceType<typeof ChatMessage>, 'sender'> & {
                        sender: Types.ObjectId | PublicUserData;
                    };
                    userToBan?: InstanceType<typeof User>;
                };
            };
        }
    }

    namespace Server {
        export type ResponseBody<T = any> = { data: T; error?: never } | { error: string; data?: never };

        export interface Request<Body = any, Params = any, QueryParams = any> extends express.Request<Params, any, any, QueryParams> {
            body: Body;
        }

        export type Response<T = any> = express.Response<ResponseBody<T>>;
    }
}

declare module 'yup' {
    type ObjectShape<T> = {
        [key in keyof T]: T[key];
    };
}

export {};
