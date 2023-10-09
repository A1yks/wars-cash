import { RemoveFbInfoReq } from '@backend/controllers/user/types';
import { IUser, Roles } from '@backend/models/User/types';

export type UserAdminInfo = {
    _id: IUser['_id'];
    name: string;
    avatarSrc: string;
    balance: number;
    withdrawn: number;
    deposited: number;
    isBanned: boolean;
    role: Roles;
};

export type RemoveFbInfoData = RemoveFbInfoReq;
