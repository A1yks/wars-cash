import { Schema, model } from 'mongoose';
import { IBonus } from './types';

const bonusSchema = new Schema<IBonus>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        availabilityTime: { type: Number, required: true, default: 0 },
    },
    { collection: 'bonuses' }
);

export default model<IBonus>('Bonus', bonusSchema);
