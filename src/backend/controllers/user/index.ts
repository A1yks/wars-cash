import { errorsHandler, handleServerErrors } from '@backend/utils/errorsHandler';
import { ChangeBalanceReq, ChangeNameReq, ChangeRoleReq, GetUsersReq, RestrictAccessReq } from './types';
import UserService from '@backend/services/user';
import FileUploaderService from '@backend/services/fileUploader';
import isValidMimeType from '@backend/utils/isValidMimeType';
import { USER_AVATARS_FOLDER_PATH } from '@backend/constants/paths';
import { MulterError } from 'multer';
import { ErrorTypes } from '@backend/enums/errors';
import path from 'path';
import logger from '@backend/utils/logger';
import { MAX_AVATAR_SIZE } from '@backend/constants';
import formatBytes from '@backend/utils/formatBytes';
import formatNumber from '@backend/utils/formatNumber';

namespace UserController {
    const upload = FileUploaderService.createUploader({
        destination: USER_AVATARS_FOLDER_PATH,
        fieldName: 'avatar',
        fileFilter: isValidMimeType,
        maxFiles: 1,
        limits: {
            fileSize: MAX_AVATAR_SIZE,
        },
    });

    export const changeName = handleServerErrors<ChangeNameReq>(async (req, res) => {
        const { name } = req.body;

        const updatedUser = await UserService.changeUserData(req.userId, { name });
        const publicUserData = UserService.getPublicUserData(updatedUser);

        res.status(200).json({ data: publicUserData });
    });

    export const changeAvatar = handleServerErrors<void, any, any>(async (req, res) => {
        upload(req, res, async (err) => {
            const { file, userId } = req;

            try {
                if (err) throw err;

                if (file !== undefined) {
                    const avatarFileName = await UserService.changeAvatar(userId, file.filename);

                    res.status(201).json({ data: avatarFileName });
                } else {
                    res.status(400).json({ error: 'Не удалось загрузить изображение' });
                }
            } catch (err) {
                if (file !== undefined) {
                    FileUploaderService.deleteFileFromDisk(path.join(USER_AVATARS_FOLDER_PATH, file.filename)).catch(logger.error);
                }

                errorsHandler(err, {
                    res,
                    unexpectedErrMsg: 'Произошла непредвиденная ошибка при загрузке изображения',
                    expectedErrors: [
                        [MulterError, 400, `Размер файла не должен превышать ${formatBytes(MAX_AVATAR_SIZE)}`],
                        [ErrorTypes.NOT_FOUND, 404],
                        [ErrorTypes.ALREADY_EXISTS, 409],
                    ],
                });
            }
        });
    });

    export const restrictAccess = handleServerErrors<RestrictAccessReq>(async (req, res) => {
        const { userId, isRestricted } = req.body;

        await UserService.restrictAccess(userId, isRestricted);

        res.status(204).send();
    });

    export const getUsers = handleServerErrors<void, void, GetUsersReq>(async (req, res) => {
        const { limit = 20, offset = 0, name } = req.query;

        const data = await UserService.getUsers(limit, offset, name);

        res.status(200).json({ data });
    });

    export const changeBalance = handleServerErrors<ChangeBalanceReq>(async (req, res) => {
        const { userId, newBalance } = req.body;

        const updatedUser = await UserService.changeUserData(userId, { balance: newBalance * 100 });

        res.status(200).json({ data: formatNumber(updatedUser.balance / 100) });
    });

    export const changeRole = handleServerErrors<ChangeRoleReq>(async (req, res) => {
        const { userId, newRole } = req.body;

        const updatedUser = await UserService.changeUserData(userId, { role: newRole });

        res.status(200).json({ data: updatedUser.role });
    });
}

export default UserController;
