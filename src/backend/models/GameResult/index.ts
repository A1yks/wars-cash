import { Schema, model } from 'mongoose';
import { IGameResult } from './types';
import { BetTypes } from '@backend/services/game/types';

const teamData = {
    bank: { type: Number, required: true },
    bettors: [
        {
            amount: { type: Number, required: true },
            bettor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        },
    ],
    coeff: { type: Number, required: true },
    percent: { type: Number, required: true },
    values: [Number, Number],
};

const gameSchema = new Schema<IGameResult>(
    {
        blueTeam: teamData,
        redTeam: teamData,
        percentageValue: { type: Number, required: true },
        winner: { type: String, enum: Object.values(BetTypes), required: true },
        createdAt: { type: Number, default: Date.now },
    },
    { collection: 'lastGames', capped: { size: 1024 * 1024 * 10, max: 10 } }
);

export default model<IGameResult>('Game', gameSchema);
