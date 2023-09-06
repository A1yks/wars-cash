import { Types } from 'mongoose';
import { Roles } from 'types/global';

export const user = {
    id: '1' as unknown as Types.ObjectId,
    avatar: '/images/avatar.jpg',
    name: 'Степан Иванов',
    role: Roles.User,
};
