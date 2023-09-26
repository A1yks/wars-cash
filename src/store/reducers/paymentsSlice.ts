import { IPayment } from '@backend/models/Payment/types';
import { createSlice } from '@reduxjs/toolkit';
import { paymentsApi } from 'store/api/payments';

export type PaymentsState = {
    payments: IPayment[];
};

const initialState: PaymentsState = {
    payments: [],
};

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addMatcher(paymentsApi.endpoints.getPayments.matchFulfilled, (state, action) => {
                state.payments = action.payload.data;
            })
            .addMatcher(paymentsApi.endpoints.createPaymentOrder.matchFulfilled, (state, action) => {
                state.payments.push(action.payload.data.payment);
            });
    },
});

export default paymentsSlice;
