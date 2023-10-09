import { Pagination } from '@backend/common/types';
import { IDeposit } from '@backend/models/Deposit/types';
import { IUser } from '@backend/models/User/types';

export type GetDepositsFilter = {
    [key in keyof Omit<IDeposit, '_id' | 'user'>]?: 1 | -1;
};

export type GetDepositsReq = Pagination & {
    filter?: string;
    userId?: IUser['_id'];
};
