import withAuthCheck from 'hoc/withAuthCheck';
import { getAdminLayout } from 'layouts/getters';

function Edit() {
    return (
        <div>
            <h1>Edit</h1>
        </div>
    );
}

Edit.getLayout = getAdminLayout;

export default withAuthCheck(Edit, true);
