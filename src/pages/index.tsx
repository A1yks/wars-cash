import MainContent from 'features/MainContent';
import MainLayout from 'layouts/MainLayout';

export default function Main() {
    return <MainContent />;
}

Main.getLayout = function getLayout(page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};
