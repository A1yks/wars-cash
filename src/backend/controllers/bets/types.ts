import { BetTypes } from '@backend/services/game/types';

export type PlaceBetReq = {
    betAmount: number;
    team: BetTypes;
};
