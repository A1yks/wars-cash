import { ObjectSchema, object, string } from 'yup';
import { GetDepositsFilter, GetDepositsReq } from './types';
import { idSchema, paginationSchema, sortField } from '@backend/common/validation';

export const depositFilterSchema = object({
    date: sortField,
    sum: sortField,
}) as ObjectSchema<GetDepositsFilter>;

export const getDepositsSchema = paginationSchema.shape({
    filter: string().optional(),
    userId: idSchema.optional(),
}) as ObjectSchema<GetDepositsReq>;
