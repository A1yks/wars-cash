import { ObjectSchema, bool, mixed, number, object, string } from 'yup';
import { ChangePaymentStatusReq, CreatePaymentReq, GetPaymentsReq } from './types';
import { PaymentStatus, PaymentSystem, paymentStatuses, paymentSystems } from '@backend/models/Payment/types';
import { idSchema } from '@backend/common/validation';

export const createPaymentSchema: ObjectSchema<CreatePaymentReq> = object({
    paymentSystem: mixed<PaymentSystem>()
        .oneOf(paymentSystems, 'Указана неподдерживаемая платежная система')
        .required('Платежная система является обязательной'),
    sum: number().min(10, 'Минимальная сумма вывода 10 рублей').required('Сумма является обязательной'),
    wallet: string().required('Номер кошелька является обязательным'),
});

export const changePaymentStatusSchema: ObjectSchema<ChangePaymentStatusReq> = object({
    paymentId: idSchema,
    status: mixed<PaymentStatus>()
        .oneOf(paymentStatuses, 'Указан несуществующий статус обработки заявки на вывод средств')
        .required('Статус обработки заявки на вывод средств является обязательным'),
});

export const getPaymentsSchema: ObjectSchema<GetPaymentsReq> = object({
    userId: idSchema.optional(),
    allPayments: bool().optional(),
});
