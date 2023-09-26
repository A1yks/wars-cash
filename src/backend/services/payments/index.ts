import { IUser } from '@backend/models/User/types';
import { CreatePaymentData } from './types';
import Payment from '@backend/models/Payment';
import UserService from '../user';
import { IPayment, PaymentStatus } from '@backend/models/Payment/types';
import { ErrorTypes } from '@backend/enums/errors';
import formatNumber from '@backend/utils/formatNumber';

namespace PaymentsService {
    export async function createPaymentOrder(userId: IUser['_id'], paymentData: CreatePaymentData) {
        paymentData.sum *= 100;

        const [payment, user] = await Promise.all([Payment.create({ user: userId, ...paymentData }), UserService.getUser(userId)]);

        user.balance -= paymentData.sum;

        await user.save();

        return { payment, balance: formatNumber(user.balance / 100) };
    }

    export async function changePaymentStatus(paymentId: IPayment['_id'], status: PaymentStatus) {
        const updatedPayment = await Payment.findOneAndUpdate({ _id: paymentId }, { status }, { new: true });

        if (updatedPayment === null) {
            throw new Error('Запрос на вывод средств не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        return updatedPayment;
    }

    export async function getPayments(userId?: IUser['_id']) {
        return await Payment.find({ user: userId });
    }
}

export default PaymentsService;
