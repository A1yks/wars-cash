import { IPayment } from '@backend/models/Payment/types';
import { api } from '.';
import { ChangePaymentStatusReq, CreatePaymentReq, GetPaymentsReq } from '@backend/controllers/payments/types';
import { CreatePaymentOrderRes } from './types';

export const paymentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPayments: build.query<API.Response<IPayment[]>, GetPaymentsReq>({
            query: (data) => ({
                url: '/payments',
                params: data,
            }),
        }),
        createPaymentOrder: build.mutation<API.Response<CreatePaymentOrderRes>, CreatePaymentReq>({
            query: (data) => ({
                url: '/payments/create',
                method: 'POST',
                body: data,
            }),
        }),
        changePaymentStatus: build.mutation<API.Response<IPayment>, ChangePaymentStatusReq>({
            query: (data) => ({
                url: '/payments/status/update',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetPaymentsQuery, useCreatePaymentOrderMutation, useChangePaymentStatusMutation } = paymentsApi;
