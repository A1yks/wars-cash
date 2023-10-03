import { ObjectSchema, bool, date, mixed, number, object, string } from 'yup';
import { ChangePaymentStatusReq, CreatePaymentReq, GetPaymentsFilter, GetPaymentsReq } from './types';
import { PaymentStatus, PaymentSystem, paymentStatuses, paymentSystems } from '@backend/models/Payment/types';
import { idSchema, paginationSchema } from '@backend/common/validation';

export const sortField = number().oneOf([1, -1], 'Указано неверное значение сортировки').optional();
export const statusField = mixed<PaymentStatus | '*'>()
    .oneOf([...paymentStatuses, '*'], 'Указан несуществующий статус обработки заявки на вывод средств')
    .required('Статус обработки заявки на вывод средств является обязательным');

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

export const getPaymentsSchema: ObjectSchema<GetPaymentsReq> = paginationSchema.shape({
    userId: idSchema.optional(),
    filter: string().optional(),
});

export const filterSchema = object({
    date: sortField,
    paymentSystem: sortField,
    status: statusField.optional(),
    sum: sortField,
    wallet: sortField,
}).optional() as ObjectSchema<GetPaymentsFilter>;
