import { SiteInfoTypes, siteInfoTypes } from '@backend/models/SiteInfo/types';
import { ObjectSchema, mixed, object, string } from 'yup';
import { ChangePageContentReq, GetPageContentReq } from './types';

export const getPageContentSchema: ObjectSchema<GetPageContentReq> = object({
    type: mixed<SiteInfoTypes>().oneOf(siteInfoTypes, 'Указан несуществующий тип страницы').required('Тип страницы обязателен'),
});

export const changePageContentSchema: ObjectSchema<ChangePageContentReq> = getPageContentSchema.shape({
    content: string().required('Контент страницы обязателен'),
});
