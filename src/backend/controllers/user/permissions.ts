import UserService from '@backend/services/user';
import { ChangeRoleReq, RestrictAccessReq } from './types';
import { compareRoles, isAdmin } from '@backend/models/User/types';

export async function canRestrictUserAccess(req: Server.Request<RestrictAccessReq>) {
    const [admin, user] = await Promise.all([UserService.getUser(req.userId), UserService.getUser(req.body.userId)]);

    return isAdmin(admin.role) && compareRoles(admin.role, user.role);
}

export async function canChangeRole(req: Server.Request<ChangeRoleReq>) {
    const [admin, user] = await Promise.all([UserService.getUser(req.userId), UserService.getUser(req.body.userId)]);

    return admin._id !== user._id && isAdmin(admin.role) && compareRoles(admin.role, user.role);
}
