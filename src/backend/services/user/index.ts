import { USER_AVATARS_FOLDER_PATH } from '@backend/constants/paths';
import { ErrorTypes } from '@backend/enums/errors';
import User from '@backend/models/User';
import { IUser, PublicUserData } from '@backend/models/User/types';
import downloadImage from '@backend/utils/downloadImage';
import { Types } from 'mongoose';
import FileUploaderService from '../fileUploader';
import path from 'path';
import BonusService from '../bonus';
import formatNumber from '@backend/utils/formatNumber';
import PaymentsService from '../payments';
import { UserAdminInfo } from './types';
import DepositsService from '../deposit';

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

    export async function getUsers(limit: number, offset: number, name?: string) {
        const usersInfoQuery = User.find();
        const countQuery = User.countDocuments();
        const formattedName = name?.trim()?.replace(/[её]/gi, '[её]');

        if (formattedName !== undefined) {
            usersInfoQuery.where('name').regex(new RegExp('^' + formattedName, 'i'));
            countQuery.where('name').regex(new RegExp('^' + formattedName, 'i'));
        }

        const [users, total] = await Promise.all([usersInfoQuery.skip(offset).limit(limit), countQuery.countDocuments()]);
        const modifiedUsers = await Promise.all(users.map(modifyUser));

        return { users: modifiedUsers, total };
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

    export async function restrictAccess(userId: IUser['_id'], isRestricted: boolean) {
        const user = await getUser(userId);

        user.isBanned = isRestricted;

        await user.save();
    }

    export async function addBalance(userId: IUser['_id'], sum: number) {
        const user = await getUser(userId);

        user.balance += sum;

        await user.save();

        return formatNumber(user.balance / 100);
    }

    export async function isBanned(userId: IUser['_id']) {
        const user = await User.findById(userId).select('isBanned').lean();

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        return user.isBanned;
    }

    export async function removeFacebookInfo(fbUserId: string) {
        const user = await User.findOne({ providerAccountId: fbUserId });

        if (user === null) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        user.avatar = 'default.jpg';
        user.name = `User${user._id}`;

        await user.save();

        const confirmationCode = user._id;
        const statusUrl = `https://${process.env.NEXT_PUBLIC_URL}/facebook/deletion?=${confirmationCode}`;

        return { statusUrl, confirmationCode };
    }

    async function modifyUser(user: IUser): Promise<UserAdminInfo> {
        const [withdrawn, deposited] = await Promise.all([
            PaymentsService.getUserWithdrawnAmount(user._id),
            DepositsService.getUserDepositAmount(user._id),
        ]);

        return {
            _id: user._id,
            name: user.name,
            avatarSrc: user.avatar,
            role: user.role,
            isBanned: user.isBanned,
            balance: formatNumber(user.balance / 100),
            deposited,
            withdrawn,
        };
    }

    async function createUser(userData: Partial<IUser>) {
        const user = await User.create(userData);

        await BonusService.createBonusInfo(user._id);

        return user;
    }
}

export default UserService;
