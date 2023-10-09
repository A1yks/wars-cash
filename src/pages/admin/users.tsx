import UsersContent from 'features/UsersContent';
import withAuthCheck from 'hoc/withAuthCheck';
import { getAdminLayout } from 'layouts/getters';

function Users() {
    return <UsersContent />;
}

Users.getLayout = getAdminLayout;

export default withAuthCheck(Users, true);
