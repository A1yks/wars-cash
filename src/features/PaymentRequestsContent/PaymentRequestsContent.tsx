import c from 'clsx';
import styles from './PaymentRequestsContent.module.scss';
import ReactPaginate from 'react-paginate';
import usePaymentRequests from './hooks/usePaymentRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { paymentStatuses } from '@backend/models/Payment/types';
import Select from 'components/Select';
import dayjs from 'dayjs';
import PageLoader from 'components/PageLoader';
import Spinner from 'components/Spinner/Spinner';
import useChangeStatus from './hooks/useChangeStatus';
import PaymentTableRow from './PaymentTableRow';
import PaymentRequestsNavigation from './PaymentRequestsNavigation';

function PaymentRequestsContent() {
    const { isLoading, isFetching, paymentRequests, pagesCount, sortValue, pageChangeHandler, sortClickHandler } = usePaymentRequests();

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className={styles.content}>
            <PaymentRequestsNavigation />
            {paymentRequests.length === 0 ? (
                <p className={styles.noRequests}>Заявок на вывод нет</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table>
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
                                <PaymentTableRow key={payment._id.toString()} payment={payment} />
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

export default PaymentRequestsContent;
