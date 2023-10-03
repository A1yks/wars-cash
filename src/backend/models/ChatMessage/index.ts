import { Schema, model } from 'mongoose';
import { IChatMessage } from './types';

const chatMessageSchema = new Schema<IChatMessage>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: { type: String, required: true, trim: true },
        date: { type: Date, default: () => new Date() },
    },
    { collection: 'chatMessages' }
);

export default model<IChatMessage>('ChatMessage', chatMessageSchema);
