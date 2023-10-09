import { IUser } from '@backend/models/User/types';
import UserService from '../user';
import Deposit from '@backend/models/Deposit';
import { GetDepositsFilter } from '@backend/controllers/deposits/types';
import { FilterQuery } from 'mongoose';
import { IDeposit } from '@backend/models/Deposit/types';
import formatNumber from '@backend/utils/formatNumber';

namespace DepositsService {
    export async function addDeposit(userId: IUser['_id'], sum: number) {
        const formattedSum = sum * 100;

        const [deposit, balance] = await Promise.all([
            Deposit.create({ user: userId, sum: formattedSum }),
            UserService.addBalance(userId, formattedSum),
        ]);

        return { deposit, balance };
    }

    export async function getDeposits(limit: number, offset: number, filter: GetDepositsFilter, userId?: IUser['_id']) {
        const { ...sortFilter } = filter;

        const searchQuery: FilterQuery<IDeposit> = {};

        if (userId !== undefined) {
            searchQuery.user = userId;
        }

        const [deposits, total] = await Promise.all([
            Deposit.find(searchQuery).sort(sortFilter).skip(offset).limit(limit),
            Deposit.countDocuments(searchQuery),
        ]);

        return { deposits, total };
    }

    export async function getUserDepositAmount(userId: IUser['_id']) {
        const deposits = await Deposit.find({ user: userId });
        const amount = deposits.reduce((acc, deposit) => acc + deposit.sum, 0);

        return formatNumber(amount / 100);
    }
}

export default DepositsService;
