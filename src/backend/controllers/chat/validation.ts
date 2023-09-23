import { ObjectSchema, object, string, mixed } from 'yup';
import { DeleteMessageReq, GetBannesUsersReq, ModerationReq, SaveMessageReq } from './types';
import { IUser, Roles } from '@backend/models/User/types';
import { idSchema, paginationSchema } from '@backend/common/validation';

export const chatMessageFieldSchema = string()
    .min(1, 'Сообщение не может быть пустым')
    .max(320, 'Максимальная длина сообщения 320 символов')
    .required('Текст сообщения является обязательным');

export const saveMessageSchema: ObjectSchema<SaveMessageReq> = object({
    sender: object({
        _id: idSchema,
        name: string().required('Имя отправителя является обязательным'),
        avatar: string().required('Аватар отправителя является обязательным'),
        role: mixed<Roles>().oneOf(Object.values(Roles), 'Указана несуществующая роль').required('Роль отправителя является обязательной'),
    }).required('Отправитель является обязательным'),
    text: chatMessageFieldSchema,
});

export const moderationSchema: ObjectSchema<ModerationReq> = object({
    userId: idSchema,
    // messageId: idSchema,
    period: mixed<NonNullable<IUser['chatTimeout']>>()
        .test('is-valid-period', 'Указан неверный период', (value) => {
            return typeof value === 'number' || value === null;
        })
        .required('Период является обязательным'),
    reason: string().defined('Причина является обязательной').strict(true),
});

export const deleteMessageSchema: ObjectSchema<DeleteMessageReq> = object({
    messageId: idSchema,
});

export const getBannedUsersSchema: ObjectSchema<GetBannesUsersReq> = paginationSchema.shape({
    filter: string(),
});
