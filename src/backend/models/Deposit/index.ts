import { Schema, model } from 'mongoose';
import { IDeposit } from './types';
import formatNumber from '@backend/utils/formatNumber';

const depositSchema = new Schema<IDeposit>(
    {
        date: { type: Date, required: true, default: () => new Date() },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        sum: { type: Number, required: true },
    },
    {
        collection: 'deposits',
        toJSON: {
            transform(doc, ret, options) {
                ret.sum = formatNumber(ret.sum / 100);
            },
        },
    }
);

export default model<IDeposit>('Deposit', depositSchema);
