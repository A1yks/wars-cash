import { Types } from 'mongoose';
import { IUser } from '../User/types';

export enum PaymentSystem {
    Qiwi = 'Qiwi',
    WebMoney = 'WebMoney',
    YooMoney = 'YooMoney',
    Payeer = 'Payeer',
    Beeline = 'Билайн',
    Megafon = 'Мегафон',
    MTS = 'МТС',
    Tele2 = 'Теле2',
    Visa = 'Visa',
    MasterCard = 'MasterCard',
}

export const paymentSystems = Object.values(PaymentSystem);

export enum PaymentStatus {
    Pending = 'В обработке',
    Success = 'Выполнено',
    Rejected = 'Отклонено',
}

export const paymentStatuses = Object.values(PaymentStatus);

export interface IPayment {
    _id: Types.ObjectId | string;
    user: IUser['_id'];
    date: Date;
    sum: number;
    paymentSystem: PaymentSystem;
    wallet: string;
    status: PaymentStatus;
}
