import { PopulatedDoc, Types, Document, ObjectId } from 'mongoose';
import { PublicUserData } from '../User/types';

export interface IChatMessage {
    _id: Types.ObjectId | string;
    sender: PopulatedDoc<Document<ObjectId> & PublicUserData>;
    text: string;
    date: Date;
}

export type PopulatedMessage = Omit<IChatMessage, 'sender'> & {
    sender: PublicUserData;
};
