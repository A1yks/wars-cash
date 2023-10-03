import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

export const dev = process.env.NODE_ENV !== 'production';
const isLocal = fs.existsSync(path.resolve('./.env.development.local')) || fs.existsSync(path.resolve('./.env.production.local'));

dotenv.config({
    path: path.resolve(`./.env.${dev ? (isLocal ? 'development.local' : 'development') : isLocal ? 'production.local' : 'production'}`),
});
