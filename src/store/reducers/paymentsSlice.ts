import { IPayment } from '@backend/models/Payment/types';
import { createSlice } from '@reduxjs/toolkit';
import { paymentsApi } from 'store/api/payments';

export type PaymentsState = {
    requests: IPayment[];
    total: number;
};

const initialState: PaymentsState = {
    requests: [],
    total: 0,
};

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addMatcher(paymentsApi.endpoints.getPayments.matchFulfilled, (state, action) => {
                return action.payload.data;
            })
            .addMatcher(paymentsApi.endpoints.createPaymentOrder.matchFulfilled, (state, action) => {
                state.requests.push(action.payload.data.payment);
            });
    },
});

export default paymentsSlice;
