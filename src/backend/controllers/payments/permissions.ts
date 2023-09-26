import UserService from '@backend/services/user';
import { ChangePaymentStatusReq, GetPaymentsReq } from './types';
import { isAdmin } from '@backend/models/User/types';

export async function canGetPayments(req: Server.Request<GetPaymentsReq>) {
    if (req.body.userId === undefined && req.body.allPayments === undefined) {
        return true;
    }

    const user = await UserService.getUser(req.userId);

    return isAdmin(user.role);
}

export async function canChangePaymentStatus(req: Server.Request<ChangePaymentStatusReq>) {
    const user = await UserService.getUser(req.userId);

    return isAdmin(user.role);
}
