import ProfileContent from 'features/ProfileContent';
import withAuthCheck from 'hoc/withAuthCheck';
import { getDefaultLayout } from 'layouts/getters';

function Profile() {
    return <ProfileContent />;
}

Profile.getLayout = getDefaultLayout;

export default withAuthCheck(Profile);
