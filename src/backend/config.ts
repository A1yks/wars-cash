import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import * as yup from 'yup';

export const dev = process.env.NODE_ENV !== 'production';
const isLocal = fs.existsSync(path.resolve('./.env.development.local')) || fs.existsSync(path.resolve('./.env.production.local'));

dotenv.config({
    path: path.resolve(`./.env.${dev ? (isLocal ? 'development.local' : 'development') : isLocal ? 'production.local' : 'production'}`),
});

yup.addMethod(yup.object, 'atLeastOneOf', function (list: any[]) {
    return this.test({
        name: 'atLeastOneOf',
        message: 'Должен быть передан один из следующих параметров: ${keys}',
        exclusive: true,
        params: { keys: list.join(', ') },
        test: (value) => !value || list.some((f) => value[f] !== null),
    });
});
