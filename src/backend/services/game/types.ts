import { PublicUserData } from '@backend/models/User/types';

export type BetData = {
    bettor: PublicUserData;
    amount: number;
};

export enum BetTypes {
    Blue = 'blue',
    Red = 'red',
}
