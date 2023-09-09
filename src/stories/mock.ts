import { IUser, Roles } from 'backend/models/User/types';
import { Types } from 'mongoose';

export const user = {
    _id: '1' as unknown as Types.ObjectId,
    facebookId: '123',
    avatar: '/images/avatar.jpg',
    name: 'Степан Иванов',
    role: Roles.User,
    balance: 10000,
} satisfies IUser;
