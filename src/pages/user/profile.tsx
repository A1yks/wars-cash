import ProfileContent from 'features/ProfileContent';
import withAuthCheck from 'hoc/withAuthCheck';
import MainLayout from 'layouts/MainLayout';
import { ReactNode } from 'react';

function Profile() {
    return <ProfileContent />;
}

Profile.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout title="Профиль">{page}</MainLayout>;
};

export default withAuthCheck(Profile, true);
