import { ObjectSchema, object, string } from 'yup';
import { GetFbDeletionInfoReq } from './types';

export const getDeletionInfoSchema: ObjectSchema<GetFbDeletionInfoReq> = object({
    code: string().required(),
});
