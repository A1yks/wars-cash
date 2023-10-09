import { ErrorTypes } from '@backend/enums/errors';
import Bonus from '@backend/models/Bonus';
import { IUser, Roles, moderRoles } from '@backend/models/User/types';
import SiteConfigService from '../site-config';
import UserService from '../user';
import formatNumber from '@backend/utils/formatNumber';

namespace BonusService {
    export async function getBonusInfo(userId: IUser['_id']) {
        const bonusInfo = await Bonus.findOne({ user: userId });

        if (bonusInfo === null) {
            return await createBonusInfo(userId);
        }

        return bonusInfo;
    }

    export async function claimBonus(userId: IUser['_id']) {
        const bonusInfo = await getBonusInfo(userId);

        if (bonusInfo.availabilityTime > Date.now()) {
            throw new Error('Бонус в настоящий момент недоступен', { cause: ErrorTypes.NO_PERMISSIONS });
        }

        const [siteConfig, user] = await Promise.all([SiteConfigService.getConfig(), UserService.getUser(userId)]);

        let role = user.role;

        if (moderRoles.includes(role)) {
            role = Roles.Premium;
        }

        const bonus = siteConfig.bonuses[role as keyof (typeof siteConfig)['bonuses']] * 100;

        user.balance += bonus;
        bonusInfo.availabilityTime = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime(); // plus one day

        await Promise.all([user.save(), bonusInfo.save()]);

        return { bonusInfo, balance: formatNumber(user.balance / 100) };
    }

    export async function createBonusInfo(userId: IUser['_id']) {
        return await Bonus.create({ user: userId });
    }
}

export default BonusService;
