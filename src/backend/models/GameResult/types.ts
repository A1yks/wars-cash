import { BetTypes, GameData } from '@backend/services/game/types';
import { Types } from 'mongoose';

export interface IGameResult extends Pick<GameData, 'redTeam' | 'blueTeam' | 'percentageValue'> {
    _id: Types.ObjectId;
    winner: BetTypes;
    createdAt: number;
}
