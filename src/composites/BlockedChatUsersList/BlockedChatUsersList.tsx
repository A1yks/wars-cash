import c from 'clsx';
import styles from './BlockedChatUsersList.module.scss';
import UserList from 'components/UserList';
import UserListItem from 'components/UserListItem';
import { ClientChatBanData } from '@backend/models/ChatBan/types';
import Input from 'components/Input';
import ReactPaginate from 'react-paginate';
import BlockedChatUserListItemContent, { BlockedChatUsersListItemContentProps } from './BlockedChatUsersListItemContent';
import React, { ComponentRef, RefObject, memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import chatStyles from 'composites/Chat/Chat.module.scss';
import Spinner from 'components/Spinner/Spinner';
import { useDebouncedValue, usePreviousRef } from '@lilib/hooks';

export type BlockedChatUsersListProps = {
    blockedUsers: ClientChatBanData[];
    totalBlockedUsers: number;
    className?: string;
    scrollClassName?: string;
    scrollRef: RefObject<ComponentRef<typeof SimpleBar>>;
    isLoadingUsers: boolean;
    isPermormingAction: boolean;
    onPageChange: (selectedItem: { selected: number }) => void;
    onUnban: BlockedChatUsersListItemContentProps['onUnban'];
    onCancel: BlockedChatUsersListItemContentProps['onCancel'];
    onSearch: (value: string) => MaybePromise<void>;
};

export const BLOCKED_USERS_PER_PAGE = 10;

function BlockedChatUsersList(props: BlockedChatUsersListProps) {
    const { onSearch } = props;
    const [searchValue, setSearchValue] = useState('');
    const pagesCount = Math.ceil(props.totalBlockedUsers / BLOCKED_USERS_PER_PAGE);
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
    const prevDebouncedSearchValueRef = usePreviousRef(debouncedSearchValue);

    useEffect(() => {
        if (!prevDebouncedSearchValueRef.current && !debouncedSearchValue) {
            return;
        }

        onSearch(debouncedSearchValue.trim());
    }, [debouncedSearchValue, onSearch, prevDebouncedSearchValueRef]);

    function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    return (
        <div className={c(styles.blockedUsers, props.className)}>
            {(pagesCount > 0 || debouncedSearchValue !== '') && (
                <div className={styles.search}>
                    <Input placeholder="Поиск" className={styles.searchInp} onChange={searchHandler} value={searchValue} />
                </div>
            )}
            <SimpleBar
                className={c(styles.scrollbar, chatStyles.scrollbar, {
                    [styles.hasPages]: pagesCount > 1,
                    [styles.noPages]: pagesCount === 0 && debouncedSearchValue === '',
                })}
                autoHide={false}
                ref={props.scrollRef}
            >
                {props.isLoadingUsers ? (
                    <Spinner />
                ) : pagesCount === 0 ? (
                    <div className={c(styles.noBlockedUsers, 'flex', 'center')}>
                        {debouncedSearchValue === '' ? 'Заблокированных пользователей нет' : 'Пользователи не найдены'}
                    </div>
                ) : (
                    <UserList className={styles.messages}>
                        {props.blockedUsers.map((data) => (
                            <UserListItem key={data._id.toString()} variant="custom" className={styles.listItem}>
                                <BlockedChatUserListItemContent
                                    data={data}
                                    isLoading={props.isPermormingAction}
                                    onUnban={props.onUnban}
                                    onCancel={props.onCancel}
                                />
                            </UserListItem>
                        ))}
                    </UserList>
                )}
            </SimpleBar>
            {pagesCount > 1 && (
                <ReactPaginate
                    key={props.blockedUsers.length}
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} fontSize="1.6rem" className="pointer" />}
                    onPageChange={props.onPageChange}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pagesCount}
                    previousLabel={<FontAwesomeIcon icon={faAngleLeft} fontSize="1.6rem" className="pointer" />}
                    className="pagination"
                    pageClassName="pagination-page"
                    activeClassName="pagination-page-active"
                    pageLinkClassName="pagination-page-link bolder"
                    activeLinkClassName="pagination-page-active-link"
                />
            )}
        </div>
    );
}

export default memo(BlockedChatUsersList);
