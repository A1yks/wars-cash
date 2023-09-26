import c from 'clsx';
import styles from './OperationsHistory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'components/Spinner/Spinner';

type Titles = Record<string, string>;

export type OperationsHistoryProps<T extends Titles> = {
    titles: T;
    data: {
        [key in keyof T]: string | number | Date;
    }[];
    name?: string;
    className?: string;
    tableWrapperClassName?: string;
    isLoading?: boolean;
};

function OperationsHistory<T extends Titles>(props: OperationsHistoryProps<T>) {
    const { name = 'История' } = props;

    return (
        <div className={c(styles.history, 'content', props.className)}>
            <h6 className={styles.title}>
                <FontAwesomeIcon icon={faHistory} />
                <span>{name}</span>
            </h6>
            {props.isLoading ? (
                <Spinner />
            ) : props.data.length === 0 ? (
                <div className={c(styles.empty, 'flex', 'center')}>История пуста</div>
            ) : (
                <div className={props.tableWrapperClassName}>
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
                                    {Object.keys(props.titles).map((key, i) => (
                                        <td key={i}>{item[key].toString()}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default OperationsHistory;
