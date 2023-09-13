import { BetData, BetTypes } from './types';

const NUMBERS = 1000;

class Game {
    blueTeamSum = 0;
    redTeamSum = 0;
    redTeamBettors: BetData[] = [];
    blueTeamBettors: BetData[] = [];

    startNewGame() {
        this.blueTeamSum = 0;
        this.redTeamSum = 0;
        this.redTeamBettors = [];
        this.blueTeamBettors = [];
    }

    get betsAmount() {
        return this.blueTeamSum + this.redTeamSum;
    }

    get coeffs() {
        const redTeamCoeff = this.betsAmount / this.redTeamSum;
        const blueTeamCoeff = this.betsAmount / this.blueTeamSum;

        return { red: redTeamCoeff, blue: blueTeamCoeff };
    }

    placeBet(team: BetTypes, bet: BetData) {
        switch (team) {
            case BetTypes.Blue:
                this.blueTeamSum += bet.amount;
                this.blueTeamBettors.push(bet);
                break;
            case BetTypes.Red:
                this.redTeamSum += bet.amount;
                this.redTeamBettors.push(bet);
                break;
        }
    }

    getWinner() {
        const winChances = this.getWinChances();
        const maxBlueWinNumber = Math.round(winChances.blue * NUMBERS);
        const randomNumber = this.generateRandomNumber();
        let winner;

        if (randomNumber > maxBlueWinNumber) {
            winner = 'red';
        } else {
            winner = 'blue';
        }

        return winner;
    }

    private getWinChances() {
        const coeffs = this.coeffs;
        const blueChance = 1 / coeffs.blue;
        const redChange = 1 - blueChance;

        return {
            red: redChange,
            blue: blueChance,
        };
    }

    private generateRandomNumber() {
        return Math.floor(Math.random() * NUMBERS) + 1;
    }
}

const gameInstance = new Game();

export default gameInstance;
