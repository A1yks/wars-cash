import c from 'clsx';
import styles from './GameSpinner.module.scss';
import colors from 'styles/colors.module.scss';
import { BetTypes } from '@backend/services/game/types';
import { PointerProps, WheelData } from 'react-custom-roulette/dist/components/Wheel/types';
import dynamic from 'next/dynamic';
import { memo, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faPlay } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useAnimation, usePreviousRef } from '@lilib/hooks';

// const Wheel = dynamic(() => import('components/Wheel').then((module) => module.Wheel), { ssr: false });

export type GameSpinnerProps = {
    blueColorPercent: number;
    isSpinning: boolean;
    isWaiting: boolean;
    isCancelled: boolean;
    rotation: number;
    spinningPercent: number;
    spinDuration: number;
    text: string;
    onStopSpinning: () => void;
    winner: BetTypes | null;
    className?: string;
};

const easingFunction = (percent: number) => -(Math.cos(Math.PI * percent) - 1) / 2;

function GameSpinner(props: GameSpinnerProps) {
    const { blueColorPercent, isSpinning, text, isWaiting, isCancelled, className, rotation, spinningPercent, spinDuration, winner, onStopSpinning } =
        props;
    const fakeDegrees = 360 * 5;
    const fullDegrees = fakeDegrees + rotation;
    const spinnerRef = useRef<HTMLDivElement>(null);
    const winnerText = winner === null ? '' : winner === BetTypes.Blue ? 'Синяя' : 'Красная';
    const isWaitingPrevRef = usePreviousRef(isWaiting);

    const [startSpinning, stopSpinning] = useAnimation(
        (percent) => {
            if (spinnerRef.current !== null) {
                const finalPercent = percent;

                spinnerRef.current.style.transform = `rotate(${finalPercent * fullDegrees}deg)`;
            }
        },
        {
            duration: spinDuration * 1000 * (1 - spinningPercent),
            algorithm(percent) {
                return easingFunction(Math.min(percent + spinningPercent, 1));
            },
        }
    );

    useEffect(() => {
        if (isSpinning) {
            startSpinning();
        } else {
            stopSpinning();
        }
    }, [isSpinning, startSpinning, stopSpinning]);

    useEffect(() => {
        if (!isWaitingPrevRef.current && isWaiting) {
            spinnerRef.current?.style.removeProperty('transform');
        }
    }, [isWaiting, isWaitingPrevRef]);

    return (
        <div className={c(styles.gameSpinner, className)}>
            <div className={c('flex', 'center', styles.arrow)}>
                <div className={styles.triangle} />
            </div>
            <div className={styles.wheelWrapper} ref={spinnerRef}>
                <CircularProgressbar
                    value={blueColorPercent}
                    styles={{
                        ...buildStyles({
                            strokeLinecap: 'butt',
                            trailColor: colors.lightRed,
                            pathColor: colors.lightBlue,
                        }),
                    }}
                    strokeWidth={15}
                />
            </div>
            <div className={c(styles.content, 'flex', 'center')}>
                {!isCancelled && isWaiting && winner === null && (
                    <FontAwesomeIcon icon={faHourglassEnd} rotation={180} className={styles.contentIcon} />
                )}
                {!isCancelled && isSpinning && winner === null && <FontAwesomeIcon icon={faPlay} className={styles.contentIcon} />}
                {winner !== null && <span className={c(styles.winner, styles[winner])}>{winnerText}</span>}
                {isCancelled && <span className={styles.cancelled}>Игра не состоялась</span>}
                {!isCancelled && !isSpinning && !isWaiting && winner === null && <span className={styles.timer}>{text}</span>}
            </div>
        </div>
    );
}

export default memo(GameSpinner);
