import { Schema, model } from 'mongoose';
import { IPayment, PaymentStatus, paymentStatuses, paymentSystems } from './types';
import formatNumber from '@backend/utils/formatNumber';

const paymentSchema = new Schema<IPayment>(
    {
        date: { type: Date, required: true, default: () => new Date() },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        sum: { type: Number, required: true },
        paymentSystem: { type: String, required: true, enum: paymentSystems },
        wallet: { type: String, required: true },
        status: { type: String, required: true, enum: paymentStatuses, default: PaymentStatus.Pending },
    },
    {
        collection: 'payments',
        toJSON: {
            transform(doc, ret, options) {
                ret.sum = formatNumber(ret.sum / 100);
            },
        },
    }
);

export default model<IPayment>('Payment', paymentSchema);
