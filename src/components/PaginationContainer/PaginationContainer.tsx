import c from 'clsx';
import styles from './PaginationContainer.module.scss';
import ReactPaginate from 'react-paginate';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

export type PaginationContainerProps = {
    pagesCount: number;
    onPageChange: (selectedItem: number) => void;
    children: ReactNode;
    className?: string;
};

function PaginationContainer(props: PaginationContainerProps) {
    function pageChangeHandler(selectedItem: { selected: number }) {
        props.onPageChange(selectedItem.selected);
    }

    return (
        <div className={c(styles.container, props.className)}>
            <div className={styles.contentWrapper}>{props.children}</div>
            {props.pagesCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} fontSize="1.6rem" className="pointer" />}
                    onPageChange={pageChangeHandler}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={props.pagesCount}
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

export default PaginationContainer;
