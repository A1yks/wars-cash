import ChatMessage from '@backend/models/ChatMessage';
import User from '@backend/models/User';
import { IUser, PublicUserData } from '@backend/models/User/types';
import express from 'express';
import { AnyObject, Types } from 'mongoose';
import { Maybe, Flags } from 'yup';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
        {
            [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
        }[Keys];

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

    interface ObjectSchema<TIn extends Maybe<AnyObject>, TContext = AnyObject, TDefault = any, TFlags extends Flags = ''> {
        atLeastOneOf(list: (keyof TIn)[]): this;
    }
}

export {};
