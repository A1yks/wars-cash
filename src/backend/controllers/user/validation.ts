import { ObjectSchema, object, string } from 'yup';
import { LoginReq } from './types';

export const loginSchema = object({
    facebookId: string().required('Facebook ID является обязательным'),
    name: string().required('Имя является обязательным'),
    avatar: string().url('Аватар должен быть ссылкой'),
});
