import { ObjectSchema, number, object, string } from 'yup';
import { Pagination } from './types';

export const idSchema = string().required('ID является обязательным');
export const limitFieldSchema = number().integer('Значение должно быть целым числом').min(1, 'Значение должно быть не меньше 1');
export const offsetFieldSchema = number().integer('Значение должно быть целым числом').min(0, 'Значение должно быть не меньше 0');

export const paginationSchema: ObjectSchema<Pagination> = object({
    limit: limitFieldSchema,
    offset: offsetFieldSchema,
});
