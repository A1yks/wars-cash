import { createSelector } from '@reduxjs/toolkit';
import GameSpinner from 'components/GameSpinner';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { memo, useCallback } from 'react';
import gameSlice from 'store/reducers/gameSlice';
import { configSelector, gameSelector } from 'store/selectors';

const { setWinner } = gameSlice.actions;

const selector = createSelector([gameSelector, configSelector], (game, config) => ({ game, config }));

function GameSpinnerContainer() {
    const {
        game: {
            blueTeam: { percent },
            remainingTime,
            isGameStarted,
            winner,
            rotation,
            spinningPercent,
            isSpinning,
            isCancelled,
        },
        config,
    } = useAppSelector(selector);
    const dispatch = useAppDispatch();

    const stopSpinningHandler = useCallback(() => {
        dispatch(setWinner(null));
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
            spinDuration={config.spinDuration}
            onStopSpinning={stopSpinningHandler}
        />
    );
}

export default memo(GameSpinnerContainer);
