import c from 'clsx';
import styles from './GameSpinner.module.scss';
import colors from 'styles/colors.module.scss';
import { BetTypes } from '@backend/services/game/types';
import { PointerProps, WheelData } from 'react-custom-roulette/dist/components/Wheel/types';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const Wheel = dynamic(() => import('react-custom-roulette').then((module) => module.Wheel), { ssr: false });

export type GameSpinnerProps = {
    blueColorPercent: number;
    isSpinning: boolean;
    text: string;
    onStopSpinning: () => void;
    winner: BetTypes;
    className?: string;
};

const pointerProps: PointerProps = { style: { display: 'none' } };

function GameSpinner(props: GameSpinnerProps) {
    const { blueColorPercent, isSpinning, text, winner, className, onStopSpinning } = props;
    const prizeNumber = winner === BetTypes.Red ? 0 : 1;
    const blueColorValue = blueColorPercent * 10;

    const wheelData: WheelData[] = [{ optionSize: 1000 - blueColorValue }, { optionSize: blueColorValue }];

    return (
        <div className={c(styles.gameSpinner, className)}>
            <div className={c('flex', 'center', styles.arrow)}>
                <div className={styles.triangle} />
            </div>
            <div className={styles.wheelWrapper}>
                <Wheel
                    mustStartSpinning={isSpinning}
                    prizeNumber={prizeNumber}
                    data={wheelData}
                    onStopSpinning={onStopSpinning}
                    backgroundColors={[colors.lightRed, colors.lightBlue]}
                    outerBorderWidth={0}
                    radiusLineWidth={1}
                    radiusLineColor="transparent"
                    innerRadius={70}
                    pointerProps={pointerProps}
                />
            </div>

            <span className={styles.text}>{text}</span>
            {/* <CircularProgressbarWithChildren
                value={blueColorPercent}
                styles={{
                    ...buildStyles({
                        rotation: rotation / 100,
                        strokeLinecap: 'butt',
                        trailColor: colors.lightRed,
                        pathColor: colors.lightBlue,
                    }),
                    text: {
                        fontWeight: 'bold',
                        fontFamily: 'Geometria',
                        fill: colors.black,
                        fontSize: '3.2rem',
                        textAnchor: 'middle',
                        alignmentBaseline: 'middle',
                    },
                }}
                strokeWidth={15}
            >
                <span className={styles.text}>{text}</span>
            </CircularProgressbarWithChildren> */}
        </div>
    );
}

export default memo(GameSpinner);
