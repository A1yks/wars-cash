import { handleServerErrors } from '@backend/utils/errorsHandler';
import { PlaceBetReq } from './types';
import BetsService from '@backend/services/bets';
import SocketService from '@backend/services/socket';
import UserService from '@backend/services/user';
import { BetData } from '@backend/services/game/types';
import gameInstance from '@backend/services/game';

namespace BetsController {
    export const placeBet = handleServerErrors<PlaceBetReq>(async (req, res) => {
        const { betAmount, team } = req.body;

        const user = await BetsService.placeBet(req.userId, betAmount);
        const bettor = UserService.getPublicUserData(user);
        const betData: BetData = { bettor, amount: betAmount };

        gameInstance.placeBet(team, betData);

        res.status(200).json({ data: user.balance });
        SocketService.broadcastBet(betData);
    });
}

export default BetsController;
