import PageLoader from 'components/PageLoader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Загрузка...',
    },
};

function Loading() {
    return <PageLoader />;
}

export default Loading;
