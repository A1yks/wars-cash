import { Types } from 'mongoose';

export enum FacebookDeletionStatuses {
    Processing = 'В обработке',
    Deleted = 'Данные удалены',
}

export const facebookDeletionStatuses = Object.values(FacebookDeletionStatuses);

export interface IFacebookDeletionInfo {
    _id: Types.ObjectId | string;
    code: string;
    status: FacebookDeletionStatuses;
}
