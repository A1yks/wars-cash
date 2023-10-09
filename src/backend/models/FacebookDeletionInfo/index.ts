import { Schema, model } from 'mongoose';
import { FacebookDeletionStatuses, IFacebookDeletionInfo, facebookDeletionStatuses } from './types';

const facebookDeletionInfoSchema = new Schema<IFacebookDeletionInfo>(
    {
        code: { type: String, required: true, unique: true },
        status: { type: String, required: true, enum: facebookDeletionStatuses, default: FacebookDeletionStatuses.Deleted },
    },
    { collection: 'facebookDeletionInfo' }
);

export default model<IFacebookDeletionInfo>('FacebookDeletionInfo', facebookDeletionInfoSchema);
