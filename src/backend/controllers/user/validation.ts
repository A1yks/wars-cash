import { ObjectSchema, object, string } from 'yup';
import { ChangeNameReq } from './types';

export const changeNameSchema: ObjectSchema<ChangeNameReq> = object({
    name: string()
        .required('Имя является обязательным')
        .min(2, 'Имя должно содержать не менее 2 символов')
        .max(30, 'Имя должно содержать не более 30 символов'),
});
