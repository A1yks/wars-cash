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
import userRouter from './routes/user';
import paymentsRouter from './routes/payments';
import depositsRouter from './routes/deposits';
import bonusRouter from './routes/bonus';
import siteConfigRouter from './routes/site-config';
import siteInfoRouter from './routes/site-info';
import facebookRouter from './routes/facebook';
import '@backend/services/game/setup';
import RandomOrgService from './services/randomOrg';
import gameInstance from '@backend/services/game/setup';

const exec = util.promisify(execDefault);

const useSSLProxy = process.env.USE_SSL_PROXY === 'true';
const port = process.env.PORT || 3000;

(async () => {
    try {
        await Promise.all([fs.promises.mkdir('logs', { recursive: true }), fs.promises.mkdir('images/users', { recursive: true })]);

        await connect()
            .then(() => logger.log('Successfully connected to the database'))
            .catch(logger.error);

        await Promise.all([RandomOrgService.setupClient(), gameInstance.setupGame()]);

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();
            const httpServer = http.createServer(app);

            SocketService.init(httpServer);

            app.use('/static/images/users', express.static(USER_AVATARS_FOLDER_PATH));

            app.use(express.json());
            app.use(express.urlencoded());
            app.use(cookieParser());

            app.use((req, res, next) => {
                if (process.env.NODE_ENV != 'development' && !req.secure) {
                    return res.redirect('https://' + req.headers.host + req.url);
                }

                next();
            });

            app.use('/api/auth', authRouter);
            app.use('/api/bets', betsRouter);
            app.use('/api/tokens', tokensRouter);
            app.use('/api/chat', chatRouter);
            app.use('/api/user', userRouter);
            app.use('/api/payments', paymentsRouter);
            app.use('/api/deposits', depositsRouter);
            app.use('/api/bonus', bonusRouter);
            app.use('/api/config', siteConfigRouter);
            app.use('/api/info', siteInfoRouter);
            app.use('/api/facebook', facebookRouter);

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
