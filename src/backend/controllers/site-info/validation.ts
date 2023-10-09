import { SiteInfoTypes, siteInfoTypes } from '@backend/models/SiteInfo/types';
import { ObjectSchema, mixed, object, string } from 'yup';
import { ChangePageContentReq, GetPageContentReq } from './types';

export const changePageContentDataSchema: ObjectSchema<ChangePageContentReq['data']> = object({
    title: string().optional().min(1, 'Заголовок должен быть не менее 1 символа'),
    content: string().optional(),
});

export const getPageContentSchema: ObjectSchema<GetPageContentReq> = object({
    type: mixed<SiteInfoTypes>().oneOf(siteInfoTypes, 'Указан несуществующий тип страницы').required('Тип страницы обязателен'),
});

export const changePageContentSchema: ObjectSchema<ChangePageContentReq> = getPageContentSchema.shape({
    data: changePageContentDataSchema.required(),
});
