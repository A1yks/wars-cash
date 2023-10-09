import ConfigContent from 'features/ConfigContent';
import withAuthCheck from 'hoc/withAuthCheck';
import { getAdminLayout } from 'layouts/getters';

function Admin() {
    return <ConfigContent />;
}

Admin.getLayout = getAdminLayout;

export default withAuthCheck(Admin, true);
