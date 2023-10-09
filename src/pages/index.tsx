import MainContent from 'features/MainContent';
import { getDefaultLayout } from 'layouts/getters';

export default function Main() {
    return <MainContent />;
}

Main.getLayout = getDefaultLayout();
