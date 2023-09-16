import GameSpinner from 'components/GameSpinner';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { memo, useCallback } from 'react';
import gameSlice from 'store/reducers/gameSlice';

const { resetGame, setWinner } = gameSlice.actions;

function GameSpinnerContainer() {
    const {
        blueTeam: { percent },
        remainingTime,
        isGameStarted,
        winner,
        rotation,
        spinningPercent,
        isSpinning,
        isCancelled,
    } = useAppSelector((state) => state.game);
    const dispatch = useAppDispatch();

    const stopSpinningHandler = useCallback(() => {
        dispatch(setWinner(null));
        // dispatch(resetGame());
    }, [dispatch]);

    return (
        <GameSpinner
            isWaiting={!isGameStarted}
            isCancelled={isCancelled}
            blueColorPercent={percent}
            text={remainingTime.toString()}
            isSpinning={isSpinning}
            winner={winner}
            rotation={rotation}
            spinningPercent={spinningPercent}
            spinDuration={10}
            onStopSpinning={stopSpinningHandler}
        />
    );
}

export default memo(GameSpinnerContainer);
