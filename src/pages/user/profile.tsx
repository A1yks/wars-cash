import ProfileContent from 'features/ProfileContent';
import withAuthCheck from 'hoc/withAuthCheck';
import MainLayout from 'layouts/MainLayout';

function Profile() {
    return (
        <MainLayout>
            <ProfileContent />;
        </MainLayout>
    );
}

export default withAuthCheck(Profile);
