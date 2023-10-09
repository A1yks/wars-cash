import Game from '@backend/services/game';
import SocketService from '@backend/services/socket';
import BetsService from '../bets';
import { BetTypes, GameData } from './types';
import { Rooms } from '../socket/types';
const gameInstance = new Game();

function getWinnerTeam(gameData: GameData, winner: Game['winner']) {
    if (winner === null) {
        if (gameData.redTeam.bank > 0) {
            return gameData.redTeam;
        }

        if (gameData.blueTeam.bank > 0) {
            return gameData.blueTeam;
        }

        return null;
    }

    return winner === BetTypes.Red ? gameData.redTeam : gameData.blueTeam;
}

gameInstance.on('timerTick', (gameData) => {
    SocketService.broadcastGame(gameData);
});

gameInstance.on('gameEnd', (gameData) => {
    SocketService.broadcastGameEnd(gameData);
});

gameInstance.on('beforeReset', async (gameData) => {
    const winner = gameInstance.winner;
    const winnerTeam = getWinnerTeam(gameData, winner);

    if (winnerTeam === null) {
        return;
    }

    const winnersTable = new Map<string, number>();

    winnerTeam.bettors.forEach((bet) => {
        const bettorId = bet.bettor._id.toString();
        const betAmount = winnersTable.get(bettorId);

        if (betAmount === undefined) {
            winnersTable.set(bettorId, bet.amount);
        } else {
            winnersTable.set(bettorId, betAmount + bet.amount);
        }
    });

    winnersTable.forEach(async (betSum, userId) => {
        const newBalance = await BetsService.cashOut(userId, betSum, winnerTeam.coeff, gameInstance.isCancelled);

        const socket = SocketService.sockets.get(userId);

        if (socket?.connected) {
            socket.emit('updateBalance', { balance: newBalance });
        }
    });

    if (winner !== null) {
        const gameResult = await BetsService.saveGameResults({ ...gameData, winner });
        SocketService.broadcastData(Rooms.Game, 'gameResult', gameResult);
    }
});

gameInstance.on('winnerDegrees', (data) => {
    SocketService.broadcastWinnerDegrees(data);
});

gameInstance.on('winner', (winner) => {
    SocketService.broadcastWinner(winner);
});

gameInstance.on('cancel', (gameData) => {
    SocketService.broadcastData(Rooms.Game, 'gameCancelled', gameData);
});

export default gameInstance;
