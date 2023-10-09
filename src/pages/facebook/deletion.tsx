import FacebookDeletionInfoContent from 'features/FacebookDeletionInfoContent';
import { getDefaultLayout } from 'layouts/getters';

function DeletionInfo() {
    return <FacebookDeletionInfoContent />;
}

DeletionInfo.getLayout = getDefaultLayout('Статус удаления');

export default DeletionInfo;
