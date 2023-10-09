import c from 'clsx';
import PaginationContainer from 'components/PaginationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import useDeposits from './hooks/useDeposits';
import PageLoader from 'components/PageLoader';
import dayjs from 'dayjs';
import Spinner from 'components/Spinner/Spinner';
import { IUser } from '@backend/models/User/types';
import paymentsTableStyles from 'features/PaymentRequestsTable/PaymentRequestsTable.module.scss';
import styles from './DepositsTable.module.scss';

export type DepositsTableProps = {
    userId?: IUser['_id'];
    className?: string;
    tableClassName?: string;
};

function DepositsTable(props: DepositsTableProps) {
    const { isLoading, isFetching, pagesCount, sortValue, deposits, pageChangeHandler, sortClickHandler } = useDeposits(props.userId);

    if (isLoading) {
        return <PageLoader />;
    }

    if (deposits.length === 0) {
        return <p className={paymentsTableStyles.noRequests}>Пополнений нет</p>;
    }

    return (
        <PaginationContainer pagesCount={pagesCount} onPageChange={pageChangeHandler} className={c(paymentsTableStyles.content, props.className)}>
            <div className={c(styles.tableWrapper, paymentsTableStyles.tableWrapper)}>
                <table className={props.tableClassName}>
                    <thead>
                        <tr>
                            <th className={c(paymentsTableStyles.tableHeader, 'pointer')} onClick={sortClickHandler('date')}>
                                {sortValue.date !== undefined && (
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className={c({ [paymentsTableStyles.rotated]: sortValue.date === -1 ? 0 : 180 })}
                                    />
                                )}{' '}
                                Дата
                                {sortValue.date !== undefined && isFetching && <Spinner size="small" className={paymentsTableStyles.spinner} />}
                            </th>
                            <th className={c(paymentsTableStyles.tableHeader, 'pointer')} onClick={sortClickHandler('sum')}>
                                {sortValue.sum !== undefined && (
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                        className={c({ [paymentsTableStyles.rotated]: sortValue.sum === -1 ? 0 : 180 })}
                                    />
                                )}{' '}
                                Сумма
                                {sortValue.sum !== undefined && isFetching && <Spinner size="small" className={paymentsTableStyles.spinner} />}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits.map((deposit) => (
                            <tr key={deposit._id.toString()}>
                                <td>{dayjs(deposit.date).format('DD.MM.YYYY')}</td>
                                <td>{deposit.sum}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PaginationContainer>
    );
}

export default DepositsTable;
