import { ObjectSchema, number, object } from 'yup';
import { ChangeSiteConfigReq } from './types';
import { string } from 'yup';
import { Roles } from '@backend/models/User/types';

export const spinDurationField = number().typeError('Длительность спина должна быть числом');
export const betsTimeField = number().typeError('Время приема ставок должно быть числом');
export const randomOrgApiKeyField = string().typeError('Ключ API random.org должен быть строкой');
export const chatMessagesToSaveField = number().typeError('Количество сообщений в чате должно быть числом');
export const minWithdrawalAmountField = number().typeError('Минимальная сумма вывода должна быть числом');
export const premiumBonusField = number().typeError('Бонус для премиум-пользователей должен быть числом');
export const vipBonusField = number().typeError('Бонус для VIP-пользователей должен быть числом');
export const userBonusField = number().typeError('Бонус для обычных пользователей должен быть числом');

export const changeSiteConfigSchema: ObjectSchema<ChangeSiteConfigReq> = object({
    spinDuration: spinDurationField,
    betsTime: betsTimeField,
    randomOrgApiKey: randomOrgApiKeyField,
    chatMessagesToSave: chatMessagesToSaveField,
    minWithdrawalAmount: minWithdrawalAmountField,
    bonuses: object({
        [Roles.Premium]: premiumBonusField,
        [Roles.Vip]: vipBonusField,
        [Roles.User]: userBonusField,
    }).atLeastOneOf([Roles.Premium, Roles.Vip, Roles.User]) as ObjectSchema<ChangeSiteConfigReq['bonuses']>,
});
