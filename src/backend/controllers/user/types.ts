import { Pagination } from '@backend/common/types';
import { IUser } from '@backend/models/User/types';

export type ChangeNameReq = {
    name: string;
};

export type RestrictAccessReq = {
    userId: IUser['_id'];
    isRestricted: boolean;
};

export type GetUsersReq = Pagination & {
    name?: string;
};

export type ChangeBalanceReq = {
    userId: IUser['_id'];
    newBalance: number;
};

export type ChangeRoleReq = {
    userId: IUser['_id'];
    newRole: IUser['role'];
};

export type RemoveFbInfoReq = {
    signed_request: string;
};
