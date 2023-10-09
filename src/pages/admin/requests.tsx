import PaymentRequestsContent from 'features/PaymentRequestsContent';
import withAuthCheck from 'hoc/withAuthCheck';
import { getAdminLayout } from 'layouts/getters';

function PaymentRequests() {
    return <PaymentRequestsContent />;
}

PaymentRequests.getLayout = getAdminLayout;

export default withAuthCheck(PaymentRequests, true);
