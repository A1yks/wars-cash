import { USER_AVATARS_FOLDER_PATH } from '@backend/constants/paths';
import { ErrorTypes } from '@backend/enums/errors';
import User from '@backend/models/User';
import { IUser, PublicUserData } from '@backend/models/User/types';
import downloadImage from '@backend/utils/downloadImage';
import { Types } from 'mongoose';

namespace UserService {
    export async function findOrCreate(userData: Partial<IUser>) {
        const user = await User.findOne({ provider: userData.provider, providerAccountId: userData.providerAccountId });

        if (user === null) {
            if (userData.avatar !== undefined) {
                userData.avatar = await downloadImage(userData.avatar, USER_AVATARS_FOLDER_PATH);
            }

            const newUser = await User.create(userData);

            return { user: newUser, isCreated: true };
        }

        return { user, isCreated: false };
    }

    export async function getUser(id: Types.ObjectId | string) {
        const user = await User.findById(id);

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        return user;
    }

    export function getPublicUserData(user: IUser) {
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
        } as PublicUserData;
    }
}

export default UserService;
