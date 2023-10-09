import CustomPageContent from 'features/CustomPageContent';
import loadCustomPage from 'initialPropsHelpers/loadCustomPages';
import { getDefaultLayout } from 'layouts/getters';

function CustomPage() {
    return <CustomPageContent />;
}

CustomPage.getLayout = getDefaultLayout();
CustomPage.getInitialProps = loadCustomPage;

export default CustomPage;
