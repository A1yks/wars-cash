import { handleServerErrors } from 'backend/utils/errorsHandler';
import { LoginReq } from './types';
import UserService from 'backend/services/user';

namespace UserController {
    export const login = handleServerErrors<LoginReq>(async (req, res) => {
        const user = await UserService.findOrCreate(req.body);

        res.json({ data: user });
    });
}

export default UserController;
