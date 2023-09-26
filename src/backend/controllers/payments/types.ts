import { IPayment } from '@backend/models/Payment/types';

export type CreatePaymentReq = Omit<IPayment, '_id' | 'date' | 'user' | 'status'>;

export type ChangePaymentStatusReq = {
    paymentId: IPayment['_id'];
    status: IPayment['status'];
};

export type GetPaymentsReq = {
    userId?: IPayment['user'];
    allPayments?: boolean;
};
