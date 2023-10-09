import { isAdmin } from '@backend/models/User/types';
import UserService from '@backend/services/user';

export async function canPerformAdminActions(req: Server.Request) {
    const admin = await UserService.getUser(req.userId);

    return isAdmin(admin.role);
}
