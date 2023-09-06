import { yupResolver as hookFormYupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { AnyObject } from 'mongoose';

function yupResolver(schema?: ObjectSchema<any, AnyObject>) {
    if (schema === undefined) {
        return undefined;
    }

    return hookFormYupResolver(schema, {
        abortEarly: false,
    });
}

export default yupResolver;
