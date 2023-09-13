import { IUser, Roles } from '@backend/models/User/types';
import { Types } from 'mongoose';

export const user = {
    _id: '1' as unknown as Types.ObjectId,
    avatar: '0fdb5f31-6f34-4bba-a279-8bdc59df5563.jpeg',
    name: 'Степан Иванов',
    role: Roles.User,
    balance: 10000,
    provider: 'facebook',
    providerAccountId: '123',
} satisfies IUser;
