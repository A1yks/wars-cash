import UserService from '@backend/services/user';
import { GetDepositsReq } from './types';
import { isAdmin } from '@backend/models/User/types';

export async function canGetDeposits(req: Server.Request<void, void, GetDepositsReq>) {
    if (req.query.userId === undefined) {
        return true;
    }

    const admin = await UserService.getUser(req.userId);

    return isAdmin(admin.role);
}
