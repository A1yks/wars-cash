import { dev } from './config';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';
import logger from './utils/logger';
import connect from './db/connect';
import fs from 'fs';
import util from 'util';
import { exec as execDefault } from 'child_process';
import { USER_AVATARS_FOLDER_PATH } from './constants/paths';
import retry from './utils/retry';
import SocketService from './services/socket';
import authRouter from './routes/auth';
import betsRouter from './routes/bets';
import tokensRouter from './routes/tokens';
import chatRouter from './routes/chat';
import '@backend/services/game/setup';

const exec = util.promisify(execDefault);

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

            SocketService.init(httpServer);

            app.use('/static/images/users', express.static(USER_AVATARS_FOLDER_PATH));

            app.use(express.json());
            app.use(cookieParser());

            app.use('/api/auth', authRouter);
            app.use('/api/bets', betsRouter);
            app.use('/api/tokens', tokensRouter);
            app.use('/api/chat', chatRouter);

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            httpServer.listen(port, () => {
                logger.log('Server running on port ' + port);

                if (useSSLProxy) {
                    retry(
                        async () => {
                            const { stdout, stderr } = await exec('npm run ssl-proxy');
                            if (stdout) console.log(stdout);
                            if (stderr) console.error(stderr);
                        },
                        { count: 3, timeout: 5000, errMsg: 'Не удалось запустить ssl' }
                    );
                }
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
