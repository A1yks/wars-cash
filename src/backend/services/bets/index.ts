import { IUser } from '@backend/models/User/types';
import UserService from '../user';
import { ErrorTypes } from '@backend/enums/errors';
import gameInstance from '../game/setup';
import formatNumber from '@backend/utils/formatNumber';
import GameResult from '@backend/models/GameResult';
import { IGameResult } from '@backend/models/GameResult/types';

namespace BetsService {
    export async function placeBet(userId: IUser['_id'], betAmount: number) {
        if (!gameInstance.isAcceptingBets) {
            throw new Error('Игра уже началась, дождитесь ее окончания', { cause: ErrorTypes.NO_PERMISSIONS });
        }

        const betValue = betAmount * 100;
        const user = await UserService.getUser(userId);

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        if (user.balance < betValue || user.balance === 0) {
            throw new Error('Недостаточно средств', { cause: ErrorTypes.NO_PERMISSIONS });
        }

        user.balance -= betValue;

        await user.save();

        if (!gameInstance.isGameStarted) {
            gameInstance.startNewGame();
        }

        return user.toJSON();
    }

    export async function cashOut(userId: IUser['_id'], winningAmount: number, coeff: number) {
        const user = await UserService.getUser(userId);

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        const winningValue = winningAmount * 100 * coeff;

        user.balance += winningValue;

        await user.save();

        return formatNumber(user.balance / 100);
    }

    export async function saveGameResults(gameData: Omit<IGameResult, '_id' | 'createdAt'>) {
        const game = await GameResult.create(gameData);

        return game;
    }

    export async function getLastGames() {
        const docAmount = await GameResult.countDocuments();
        const lastGames = await GameResult.find().skip(docAmount - 8);

        return lastGames;
    }
}

export default BetsService;
