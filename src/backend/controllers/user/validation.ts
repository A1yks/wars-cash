import { ObjectSchema, bool, mixed, number, object, string } from 'yup';
import { ChangeBalanceReq, ChangeNameReq, ChangeRoleReq, GetUsersReq, RestrictAccessReq } from './types';
import { idSchema, paginationSchema } from '@backend/common/validation';
import { Roles, roleValues } from '@backend/models/User/types';

export const newBalanceField = number()
    .typeError('Баланс должен быть числом')
    .min(0, 'Баланс не может быть отрицательным')
    .required('Баланс является обязательным');

export const changeNameSchema: ObjectSchema<ChangeNameReq> = object({
    name: string()
        .required('Имя является обязательным')
        .min(2, 'Имя должно содержать не менее 2 символов')
        .max(30, 'Имя должно содержать не более 30 символов'),
});

export const restrictAccessSchema: ObjectSchema<RestrictAccessReq> = object({
    userId: idSchema,
    isRestricted: bool().required('Необходимо указать, нужно ли ограничить доступ'),
});

export const getUsersSchema: ObjectSchema<GetUsersReq> = paginationSchema.shape({
    name: string(),
});

export const changeBalanceSchema: ObjectSchema<ChangeBalanceReq> = object({
    userId: idSchema,
    newBalance: newBalanceField,
});

export const changeRoleSchema: ObjectSchema<ChangeRoleReq> = object({
    userId: idSchema,
    newRole: mixed<Roles>().oneOf(roleValues, 'Указана несуществующая роль').required('Роль является обязательной'),
});
