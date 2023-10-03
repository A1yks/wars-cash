import { ObjectSchema, mixed, number, object } from 'yup';
import { PlaceBetReq } from './types';
import { BetTypes } from '@backend/services/game/types';

export const placeBetSchema: ObjectSchema<PlaceBetReq> = object({
    betAmount: number().required('Сумма ставки является обязательной'),
    team: mixed<BetTypes>().oneOf(Object.values(BetTypes)).required('Команда является обязательной'),
});
