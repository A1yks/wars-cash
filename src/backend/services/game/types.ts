import { PublicUserData } from '@backend/models/User/types';

export type BetData = {
    bettor: PublicUserData;
    amount: number;
};

export enum BetTypes {
    Blue = 'blue',
    Red = 'red',
}

export type TeamInfo = {
    bank: number;
    bettors: BetData[];
    coeff: number;
    percent: number;
    values: [minValue: number, maxValue: number];
};

export type GameData = {
    redTeam: TeamInfo;
    blueTeam: TeamInfo;
    percentageValue: number;
    remainingTime: number;
    isGameStarted: boolean;
    isAcceptingBets: boolean;
    isSpinning: boolean;
    isCancelled: boolean;
};

export type GameEvents = 'timerTick' | 'gameEnd' | 'spinning' | 'winnerDegrees' | 'winner' | 'beforeReset' | 'cancel';

export type GameEventPayload = {
    timerTick: GameData;
    gameEnd: GameData;
    beforeReset: GameData;
    spinning: number;
    winnerDegrees: {
        degrees: number;
        progress: number;
    };
    winner: BetTypes;
    cancel: GameData;
};

export type GameEventCallback<Event extends GameEvents> = (payload: GameEventPayload[Event]) => void;

export type GameEventCallbacks = {
    [Event in GameEvents]: GameEventCallback<Event> | null;
};
