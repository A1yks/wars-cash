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
import { USER_AVATARS_FOLDER_PATH } from './constants/paths';
import { exec } from 'child_process';

const dev = process.env.NODE_ENV !== 'production';

dotenv.config({ path: path.resolve(`./.env.${dev ? 'development' : 'production'}`) });

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

                if (dev) {
                    exec('npm run ssl-proxy', (err, stdout, stderr) => {
                        if (err) {
                            logger.error(err);
                        }

                        if (stdout) {
                            logger.log(stdout);
                        }

                        if (stderr) {
                            logger.error(stderr);
                        }
                    });
                }
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
