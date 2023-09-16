import formatNumber from '@backend/utils/formatNumber';
import { BetData, BetTypes, GameData, GameEventCallback, GameEventCallbacks, GameEvents } from './types';
import { NUMBERS, GAME_TIME, SPINNING_TIME } from './config';

class Game {
    blueTeamSum = 0;
    redTeamSum = 0;
    rotation = 0;
    spinningProgress = 0;
    redTeamBettors: BetData[] = [];
    blueTeamBettors: BetData[] = [];
    startTime: number | null = null;
    winner: BetTypes | null = null;
    isGameStarted = false;
    isAcceptingBets = true;
    isSpinning = false;
    isCancelled = false;
    hasOtherBettors = false;
    private firstBettorId: string | null = null;
    private startSpinningTime: number | null = null;
    private eventListenersSet = false;
    private spinningTimer: NodeJS.Timeout | null = null;
    private timer: NodeJS.Timeout | null = null;
    private callbacks: GameEventCallbacks = {
        timerTick: null,
        gameEnd: null,
        beforeReset: null,
        spinning: null,
        winnerDegrees: null,
        winner: null,
        cancel: null,
    };

    on<Event extends GameEvents>(event: Event, callback: GameEventCallbacks[Event]) {
        this.callbacks[event] = callback;
    }

    startNewGame() {
        this.resetGame();

        if (!this.eventListenersSet) {
            this.setupEventListeners();
        }

        this.startTime = Date.now();
        this.isGameStarted = true;
    }

    get betsAmount() {
        return this.blueTeamSum + this.redTeamSum;
    }

    get coeffs() {
        const redTeamCoeff = !this.isGameStarted ? 2 : this.betsAmount / this.redTeamSum;
        const blueTeamCoeff = !this.isGameStarted ? 2 : this.betsAmount / this.blueTeamSum;

        return { red: redTeamCoeff, blue: blueTeamCoeff };
    }

    placeBet(team: BetTypes, bet: BetData) {
        if (this.firstBettorId === null) {
            this.firstBettorId = bet.bettor._id.toString();
        } else if (this.firstBettorId !== bet.bettor._id.toString()) {
            this.hasOtherBettors = true;
        }

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

    getWinner(winnerNum: number) {
        const winChances = this.getWinChances();
        const maxRedWinNumber = Math.round(winChances.red * NUMBERS);
        let winner;

        if (winnerNum > maxRedWinNumber) {
            winner = BetTypes.Blue;
        } else {
            winner = BetTypes.Red;
        }

        this.winner = winner;

        return winner;
    }

    getGameData(remainingTime?: number): GameData {
        const winChances = this.getWinChances();
        const maxRedWinNumber = Math.round(winChances.red * NUMBERS);
        const coeffs = this.coeffs;

        return {
            blueTeam: {
                bank: formatNumber(this.blueTeamSum),
                bettors: this.blueTeamBettors,
                coeff: formatNumber(coeffs.blue),
                percent: formatNumber(winChances.blue * 100),
                values: maxRedWinNumber === NUMBERS ? [0, 0] : [maxRedWinNumber + 1, NUMBERS],
            },
            redTeam: {
                bank: formatNumber(this.redTeamSum),
                bettors: this.redTeamBettors,
                coeff: formatNumber(coeffs.red),
                percent: formatNumber(winChances.red * 100),
                values: [1, maxRedWinNumber],
            },
            percentageValue: NUMBERS,
            remainingTime: Math.max(remainingTime ?? this.getRemainingTime(), 0),
            isGameStarted: this.isGameStarted,
            isAcceptingBets: this.isAcceptingBets,
            isSpinning: this.isSpinning,
            isCancelled: this.isCancelled,
        };
    }

    private cancelGame() {
        this.isCancelled = true;
        this.callbacks.cancel?.(this.getGameData());
        this.endGame();
    }

    private startSpinning() {
        this.isAcceptingBets = false;

        const { rotation, winner } = this.getWinnerData();

        this.callbacks.winnerDegrees?.({ degrees: rotation, progress: this.spinningProgress });

        this.isSpinning = true;
        this.startSpinningTime = Date.now();

        this.spinningTimer = setInterval(() => {
            const now = Date.now();
            const time = now - this.startSpinningTime!;
            const progress = formatNumber(time / 1000 / SPINNING_TIME);

            this.spinningProgress = progress;

            if (progress >= 1) {
                this.isSpinning = false;

                if (this.spinningTimer !== null) {
                    clearInterval(this.spinningTimer);
                    this.spinningTimer = null;
                    this.callbacks.winner?.(winner);
                    this.endGame();
                }
            }
        }, 500);
    }

    private endGame() {
        setTimeout(() => {
            this.callbacks.beforeReset?.(this.getGameData());
            this.isGameStarted = false;
            this.resetGame();
            this.callbacks.gameEnd?.(this.getGameData());
        }, 3000);
    }

    private resetGame() {
        this.blueTeamSum = 0;
        this.redTeamSum = 0;
        this.spinningProgress = 0;
        this.rotation = 0;
        this.redTeamBettors = [];
        this.blueTeamBettors = [];
        this.startTime = null;
        this.isGameStarted = false;
        this.isSpinning = false;
        this.isAcceptingBets = true;
        this.hasOtherBettors = false;
        this.isCancelled = false;
        this.firstBettorId = null;
    }

    private getWinChances() {
        const coeffs = this.coeffs;
        const blueChance = 1 / coeffs.blue;
        const redChance = 1 - blueChance;

        return {
            red: redChance,
            blue: blueChance,
        };
    }

    private getWinnerData() {
        const winnerNumber = this.generateRandomNumber();
        const winner = this.getWinner(winnerNumber);
        const degree = (360 / NUMBERS) * winnerNumber;
        const rotation = degree;

        this.rotation = rotation;

        return { rotation, winner };
    }

    private generateRandomNumber() {
        return Math.floor(Math.random() * NUMBERS) + 1;
    }

    private getRemainingTime() {
        if (this.startTime === null) {
            return GAME_TIME;
        }

        const now = Date.now();
        const time = GAME_TIME - Math.floor((now - this.startTime) / 1000);

        return time;
    }

    private onTimerTick(callback: GameEventCallback<'timerTick'>) {
        this.timer = setInterval(() => {
            const time = this.getRemainingTime();

            if (time <= 0) {
                if (this.hasOtherBettors && this.blueTeamBettors.length > 0 && this.redTeamBettors.length > 0) {
                    this.startSpinning();
                } else {
                    this.cancelGame();
                }

                if (this.timer !== null) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            } else {
                callback(this.getGameData(time));
            }
        }, 1000);
    }

    private setupEventListeners() {
        if (this.callbacks.timerTick !== null) {
            this.onTimerTick(this.callbacks.timerTick);
        }
    }
}

export default Game;
