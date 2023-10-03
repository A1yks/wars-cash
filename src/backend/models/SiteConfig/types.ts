import { Types } from 'mongoose';

export interface ISiteConfig {
    _id: Types.ObjectId;
    chatMessagesToSave: number;
    spinDuration: number;
}
