import { ObjectSchema, object, string } from 'yup';
import { AuthReq } from './types';
import { TokenProviders } from '@backend/middleware/tokens/types';

export const registerSchema: ObjectSchema<AuthReq> = object({
    token: string().required('Токен является обязательным'),
    provider: string().oneOf<TokenProviders>(['facebook']).required('Провайдер токена является обязательным'),
    providerAccountId: string().required('ID аккаунта является обязательным'),
    name: string().required('Имя является обязательным'),
    avatar: string().url('Аватар должен быть ссылкой'),
});
