import PagesEditorContent from 'features/PagesEditorContent';
import withAuthCheck from 'hoc/withAuthCheck';
import { getAdminLayout } from 'layouts/getters';

function Edit() {
    return <PagesEditorContent />;
}

Edit.getLayout = getAdminLayout;

export default withAuthCheck(Edit, true);
