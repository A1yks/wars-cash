import { IUser } from '@backend/models/User/types';
import { CreatePaymentData } from './types';
import Payment from '@backend/models/Payment';
import UserService from '../user';
import { IPayment, PaymentStatus, paymentStatuses } from '@backend/models/Payment/types';
import { ErrorTypes } from '@backend/enums/errors';
import formatNumber from '@backend/utils/formatNumber';
import SiteConfigService from '../site-config';
import { GetPaymentsFilter } from '@backend/controllers/payments/types';
import { FilterQuery } from 'mongoose';

namespace PaymentsService {
    export async function createPaymentOrder(userId: IUser['_id'], paymentData: CreatePaymentData) {
        const siteConfig = await SiteConfigService.getConfig();
        const { minWithdrawalAmount } = siteConfig;

        if (paymentData.sum < minWithdrawalAmount) {
            throw new Error(`Минимальная сумма вывода ${minWithdrawalAmount} рублей`, { cause: ErrorTypes.BAD_DATA });
        }

        paymentData.sum *= 100;

        const [payment, user] = await Promise.all([Payment.create({ user: userId, ...paymentData }), UserService.getUser(userId)]);

        user.balance -= paymentData.sum;

        await user.save();

        return { payment, balance: formatNumber(user.balance / 100) };
    }

    export async function changePaymentStatus(paymentId: IPayment['_id'], status: PaymentStatus) {
        const payment = await Payment.findById(paymentId);

        if (payment === null) {
            throw new Error('Запрос на вывод средств не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        // if prev status was "rejected", then user balance should be subtracted
        if (payment.status === PaymentStatus.Rejected) {
            await UserService.addBalance(payment.user, -payment.sum);
        }

        // if new status is "rejected", then payment money should be returned
        if (status === PaymentStatus.Rejected) {
            await UserService.addBalance(payment.user, payment.sum);
        }

        payment.status = status;

        await payment.save();

        return payment;
    }

    export async function getPayments(limit: number, offset: number, filter: GetPaymentsFilter, userId?: IUser['_id']) {
        const { status = '*', ...sortFilter } = filter;
        const searchQuery: FilterQuery<IPayment> = {
            status: status === '*' ? { $in: paymentStatuses } : status,
        };

        if (userId !== undefined) {
            searchQuery['user'] = userId;
        }

        const [requests, total] = await Promise.all([
            Payment.find(searchQuery).sort(sortFilter).skip(offset).limit(limit),
            Payment.countDocuments(searchQuery),
        ]);

        return { requests, total };
    }

    export async function getUserWithdrawnAmount(userId: IUser['_id']) {
        const payment = await Payment.find({ user: userId, status: PaymentStatus.Success });
        const amount = payment.reduce((acc, curr) => acc + curr.sum, 0);

        return formatNumber(amount / 100);
    }
}

export default PaymentsService;
