import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import c from 'clsx';
import styles from './GameSpinner.module.scss';
import colors from 'styles/colors.module.scss';

export type GameSpinnerProps = {
    redColorPercent: number;
    text: string;
    rotation?: number;
    className?: string;
};

function GameSpinner(props: GameSpinnerProps) {
    const { redColorPercent, rotation = 0, text, className } = props;

    return (
        <div className={c(styles.gameSpinner, className)}>
            <div className={c('flex', 'center', styles.arrow)}>
                <div className={styles.triangle} />
            </div>
            <CircularProgressbarWithChildren
                value={redColorPercent}
                styles={{
                    ...buildStyles({
                        rotation: rotation / 100,
                        strokeLinecap: 'butt',
                        trailColor: colors.lightRed,
                        backgroundColor: colors.lightBlue,
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
            </CircularProgressbarWithChildren>
        </div>
    );
}

export default GameSpinner;
