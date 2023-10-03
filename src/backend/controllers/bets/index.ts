import { handleServerErrors } from '@backend/utils/errorsHandler';
import { PlaceBetReq } from './types';
import BetsService from '@backend/services/bets';
import SocketService from '@backend/services/socket';
import UserService from '@backend/services/user';
import { BetData } from '@backend/services/game/types';
import gameInstance from '@backend/services/game/setup';

namespace BetsController {
    export const placeBet = handleServerErrors<PlaceBetReq>(async (req, res) => {
        const { betAmount, team } = req.body;

        const user = await BetsService.placeBet(req.userId, betAmount);
        const bettor = UserService.getPublicUserData(user);
        const betData: BetData = { bettor, amount: betAmount };

        gameInstance.placeBet(team, betData);

        const gameData = gameInstance.getGameData();

        res.status(200).json({ data: user.balance });
        SocketService.broadcastGame(gameData);
    });

    export const getLastGames = handleServerErrors(async (req, res) => {
        const lastGames = await BetsService.getLastGames();

        res.status(200).json({ data: lastGames });
    });
}

export default BetsController;
