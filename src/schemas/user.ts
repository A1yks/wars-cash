import { object, string } from 'yup';

export const nameFieldSchema = string().required('Имя обязательно для заполнения');

export const userSchema = object({
    _id: string().required(),
    name: nameFieldSchema,
    avatar: string().required(),
    role: string().required(),
});
