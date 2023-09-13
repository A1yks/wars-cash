import { IUser } from '@backend/models/User/types';
import UserService from '../user';
import { ErrorTypes } from '@backend/enums/errors';

namespace BetsService {
    export async function placeBet(userId: IUser['_id'], betAmount: number) {
        const user = await UserService.getUser(userId);

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        if (user.balance < betAmount || user.balance === 0) {
            throw new Error('Недостаточно средств', { cause: ErrorTypes.NO_PERMISSIONS });
        }

        user.balance -= betAmount;

        await user.save();

        return user;
    }
}

export default BetsService;
