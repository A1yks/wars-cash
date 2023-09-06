import c from 'clsx';
import styles from './OperationsHistory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

type Titles = Record<string, string>;

export type OperationsHistoryProps<T extends Titles> = {
    titles: T;
    data: {
        [key in keyof T]: string;
    }[];
    name?: string;
    className?: string;
};

function OperationsHistory<T extends Titles>(props: OperationsHistoryProps<T>) {
    const { name = 'История' } = props;

    return (
        <div className={c(styles.history, 'content', props.className)}>
            <h6>
                <FontAwesomeIcon icon={faHistory} />
                <span>{name}</span>
            </h6>
            {props.data.length === 0 ? (
                <div className={c(styles.empty, 'flex', 'center')}>История пуста</div>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {Object.values(props.titles).map((title, i) => (
                                <th key={i}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((item, i) => (
                            <tr key={i}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OperationsHistory;
