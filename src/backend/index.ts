import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';
import logger from './utils/logger';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

console.log(port);

(async () => {
    try {
        logger.log('Successfully connected to the database');

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();
            const httpServer = http.createServer(app);

            app.use(express.json());
            app.use(cookieParser());

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            httpServer.listen(port, () => {
                logger.log('Server running on port ' + port);
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
