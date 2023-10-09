import c from 'clsx';
import styles from './PaymentRequestsTable.module.scss';
import { faAngleLeft, faAngleRight, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'components/Spinner/Spinner';
import PaymentTableRow from './PaymentTableRow';
import { IUser } from '@backend/models/User/types';
import PaymentRequestsNavigation from 'features/PaymentRequestsTable/PaymentRequestsNavigation';
import ReactPaginate from 'react-paginate';
import usePaymentRequests from './hooks/usePaymentRequests';
import PageLoader from 'components/PageLoader';

export type PaymentRequestsTableProps = {
    userId?: IUser['_id'];
    className?: string;
    tableWrapperClassName?: string;
    tableClassName?: string;
    staticStatus?: boolean;
};

function PaymentRequestsTable(props: PaymentRequestsTableProps) {
    const { isLoading, isFetching, paymentRequests, pagesCount, sortValue, status, updateStatus, pageChangeHandler, sortClickHandler } =
        usePaymentRequests(props.userId);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className={c(styles.content, props.className)}>
            <PaymentRequestsNavigation currentStatus={status} updateStatus={updateStatus} />
            {paymentRequests.length === 0 ? (
                <p className={styles.noRequests}>Заявок нет</p>
            ) : (
                <div className={c(styles.tableWrapper, props.tableWrapperClassName)}>
                    <table className={props.tableClassName}>
                        <thead>
                            <tr>
                                <th className={c(styles.tableHeader, 'pointer')} onClick={sortClickHandler('date')}>
                                    {sortValue.date !== undefined && (
                                        <FontAwesomeIcon icon={faSortDown} className={c({ [styles.rotated]: sortValue.date === -1 ? 0 : 180 })} />
                                    )}{' '}
                                    Дата
                                    {sortValue.date !== undefined && isFetching && <Spinner size="small" className={styles.spinner} />}
                                </th>
                                <th className={c(styles.tableHeader, 'pointer')} onClick={sortClickHandler('sum')}>
                                    {sortValue.sum !== undefined && (
                                        <FontAwesomeIcon icon={faSortDown} className={c({ [styles.rotated]: sortValue.sum === -1 ? 0 : 180 })} />
                                    )}{' '}
                                    Сумма
                                    {sortValue.sum !== undefined && isFetching && <Spinner size="small" className={styles.spinner} />}
                                </th>
                                <th className={c(styles.tableHeader, 'pointer')} onClick={sortClickHandler('paymentSystem')}>
                                    {sortValue.paymentSystem !== undefined && (
                                        <FontAwesomeIcon
                                            icon={faSortDown}
                                            className={c({ [styles.rotated]: sortValue.paymentSystem === -1 ? 0 : 180 })}
                                        />
                                    )}{' '}
                                    Тип кошелька
                                    {sortValue.paymentSystem !== undefined && isFetching && <Spinner size="small" className={styles.spinner} />}
                                </th>
                                <th className={c(styles.tableHeader, 'pointer')} onClick={sortClickHandler('wallet')}>
                                    {sortValue.wallet !== undefined && (
                                        <FontAwesomeIcon icon={faSortDown} className={c({ [styles.rotated]: sortValue.wallet === -1 ? 0 : 180 })} />
                                    )}{' '}
                                    Кошелек
                                    {sortValue.wallet !== undefined && isFetching && <Spinner size="small" className={styles.spinner} />}
                                </th>
                                <th className={styles.tableHeader}>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentRequests.map((payment) => (
                                <PaymentTableRow key={payment._id.toString()} payment={payment} staticStaus={props.staticStatus} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {pagesCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} fontSize="1.6rem" className="pointer" />}
                    onPageChange={pageChangeHandler}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pagesCount}
                    previousLabel={<FontAwesomeIcon icon={faAngleLeft} fontSize="1.6rem" className="pointer" />}
                    className={c('pagination', styles.pagination)}
                    pageClassName="pagination-page"
                    activeClassName="pagination-page-active"
                    pageLinkClassName="pagination-page-link bolder"
                    activeLinkClassName="pagination-page-active-link"
                />
            )}
        </div>
    );
}

export default PaymentRequestsTable;
