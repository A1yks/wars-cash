import { BetTypes } from '@backend/services/game/types';
import styles from './Results.module.scss';
import c from 'clsx';

export type ResultsProps = {
    className?: string;
    data: BetTypes[];
};

function Results(props: ResultsProps) {
    return (
        <div className={c(styles.results, props.className)}>
            {props.data.map((item, i) => (
                <div key={i} className={c(styles.result, styles[item])} />
            ))}
        </div>
    );
}

export default Results;
