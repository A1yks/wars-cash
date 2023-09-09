import { USER_AVATARS_FOLDER_PATH } from '@backend/constants/paths';
import User from '@backend/models/User';
import { IUser } from '@backend/models/User/types';
import downloadImage from '@backend/utils/downloadImage';
import { Types } from 'mongoose';

namespace UserService {
    export async function findOrCreate(userData: Partial<IUser>) {
        const user = await User.findOne({ facebookId: userData.facebookId });

        if (user === null) {
            if (userData.avatar !== undefined) {
                userData.avatar = await downloadImage(userData.avatar, USER_AVATARS_FOLDER_PATH);
            }

            return await User.create(userData);
        }

        return user;
    }

    export async function getUser(id: Types.ObjectId) {
        return await User.findById(id);
    }
}

export default UserService;
