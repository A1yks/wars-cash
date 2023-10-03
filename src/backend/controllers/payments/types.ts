import { Pagination } from '@backend/common/types';
import { IPayment, PaymentStatus } from '@backend/models/Payment/types';

export type CreatePaymentReq = Omit<IPayment, '_id' | 'date' | 'user' | 'status'>;

export type ChangePaymentStatusReq = {
    paymentId: IPayment['_id'];
    status: IPayment['status'];
};

export type GetPaymentsFilter = {
    [key in keyof Omit<IPayment, '_id' | 'user' | 'status'>]?: 1 | -1;
} & { status?: PaymentStatus | '*' };

export type GetPaymentsReq = Pagination & {
    userId?: IPayment['user'];
    filter?: string;
};
