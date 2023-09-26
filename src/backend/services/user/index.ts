import { USER_AVATARS_FOLDER_PATH } from '@backend/constants/paths';
import { ErrorTypes } from '@backend/enums/errors';
import User from '@backend/models/User';
import { IUser, PublicUserData } from '@backend/models/User/types';
import downloadImage from '@backend/utils/downloadImage';
import { Types } from 'mongoose';
import FileUploaderService from '../fileUploader';
import path from 'path';
import BonusService from '../bonus';

namespace UserService {
    export async function findOrCreate(userData: Partial<IUser>) {
        const user = await User.findOne({ provider: userData.provider, providerAccountId: userData.providerAccountId });

        if (user === null) {
            if (userData.avatar !== undefined) {
                userData.avatar = await downloadImage(userData.avatar, USER_AVATARS_FOLDER_PATH);
            }

            const newUser = await createUser(userData);

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

    export async function changeUserData(userId: IUser['_id'], userData: Partial<Omit<IUser, '_id'>>) {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, userData, { new: true });

        if (updatedUser === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        return updatedUser;
    }

    export async function changeAvatar(userId: IUser['_id'], fileName: string) {
        const user = await getUser(userId);
        const oldAvatar = user.avatar;

        user.avatar = fileName;

        await user.save();

        if (oldAvatar !== null) {
            FileUploaderService.deleteFileFromDisk(path.join(USER_AVATARS_FOLDER_PATH, oldAvatar));
        }

        return user.avatar;
    }

    export function getPublicUserData(user: IUser) {
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
        } as PublicUserData;
    }

    async function createUser(userData: Partial<IUser>) {
        const user = await User.create(userData);

        await BonusService.createBonusInfo(user._id);

        return user;
    }
}

export default UserService;
