import { ErrorTypes } from '@backend/enums/errors';
import FacebookDeletionInfo from '@backend/models/FacebookDeletionInfo';
import { IFacebookDeletionInfo } from '@backend/models/FacebookDeletionInfo/types';

namespace FacebookService {
    export async function createDeletionInfo(code: IFacebookDeletionInfo['code']) {
        return await FacebookDeletionInfo.create({ code });
    }

    export async function getDeletionInfo(code: IFacebookDeletionInfo['code']) {
        const info = await FacebookDeletionInfo.findOne({ code });

        if (info === null) {
            throw new Error('Данные не найдены', { cause: ErrorTypes.NOT_FOUND });
        }

        return info;
    }

    export async function removeDeletionInfo(code: IFacebookDeletionInfo['code']) {
        const info = await getDeletionInfo(code);

        await info.deleteOne();
    }
}

export default FacebookService;
