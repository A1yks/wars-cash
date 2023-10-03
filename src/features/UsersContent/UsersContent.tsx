import Input from 'components/Input';
import styles from './UsersContent.module.scss';
import useUsersContent from './hooks/useUsersContent';
import UsersContentList from './UsersContentList';
import PageLoader from 'components/PageLoader';

function UsersContent() {
    const { usersInfo, isGettingUsers } = useUsersContent();

    if (isGettingUsers) {
        return <PageLoader />;
    }

    return (
        <div>
            <Input placeholder="Поиск" />
            <UsersContentList usersInfo={usersInfo} />
        </div>
    );
}

export default UsersContent;
