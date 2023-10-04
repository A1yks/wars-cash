import c from 'clsx';
import Input from 'components/Input';
import styles from './UsersContent.module.scss';
import useUsersContent from './hooks/useUsersContent';
import UsersContentList from './UsersContentList';
import PageLoader from 'components/PageLoader';
import PaginationContainer from 'components/PaginationContainer';

function UsersContent() {
    const { usersInfo, searchValue, isGettingUsers, pagesCount, pageChangeHandler, changeSearchValueHandler } = useUsersContent();

    if (isGettingUsers) {
        return <PageLoader />;
    }

    return (
        <div className={styles.content}>
            <Input placeholder="Поиск" value={searchValue} onChange={changeSearchValueHandler} />
            {usersInfo.length === 0 ? (
                <p className={c(styles.noUsers, 'flex', 'center', 'bold')}>Пользователи не найдены</p>
            ) : (
                <PaginationContainer pagesCount={pagesCount} onPageChange={pageChangeHandler}>
                    <UsersContentList usersInfo={usersInfo} />
                </PaginationContainer>
            )}
        </div>
    );
}

export default UsersContent;
