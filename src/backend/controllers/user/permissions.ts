import UserService from '@backend/services/user';
import { RestrictAccessReq } from './types';
import { compareRoles, isAdmin } from '@backend/models/User/types';

export async function canRestrictUserAccess(req: Server.Request<RestrictAccessReq>) {
    const [admin, user] = await Promise.all([UserService.getUser(req.userId), UserService.getUser(req.body.userId)]);

    return isAdmin(user.role) && compareRoles(admin.role, user.role);
}
