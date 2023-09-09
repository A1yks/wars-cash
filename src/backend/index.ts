import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';
import logger from './utils/logger';
import authRouter from './routes/auth';
import connect from './db/connect';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { exec as execDefault } from 'child_process';
import { USER_AVATARS_FOLDER_PATH } from './constants/paths';
import retry from './utils/retry';

const exec = util.promisify(execDefault);

const dev = process.env.NODE_ENV !== 'production';

dotenv.config({ path: path.resolve(`./.env.${dev ? 'development' : 'production'}`) });

const useSSLProxy = process.env.USE_SSL_PROXY === 'true';
const port = process.env.PORT || 3000;

(async () => {
    try {
        await Promise.all([fs.promises.mkdir('logs', { recursive: true }), fs.promises.mkdir('images/users', { recursive: true })]);

        await connect()
            .then(() => logger.log('Successfully connected to the database'))
            .catch(logger.error);

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();
            const httpServer = http.createServer(app);

            app.use('/static/images/users', express.static(USER_AVATARS_FOLDER_PATH));

            app.use(express.json());
            app.use(cookieParser());

            app.use('/api/auth', authRouter);

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            httpServer.listen(port, () => {
                logger.log('Server running on port ' + port);

                if (useSSLProxy) {
                    retry(
                        async () => {
                            await exec('npm run ssl-proxy');
                        },
                        { count: 3 }
                    );
                }
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
