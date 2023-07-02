import express from 'express';
import ws from 'ws';
import { logger } from './utils/logger';

const PORT = 3000;
const WS_PORT = 3500;

const app = express();
const wss = new ws.Server({ port: WS_PORT });

app.get('/', (req, res) => {
    logger.info("");
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    logger.info(`Server app listening on port ${PORT}`);
});

wss.on('connection', (ws: any) => {
    logger.info(`[ws] Connection detected`);
    ws.on('message', (data: string) => {
        logger.info(`[ws] ${data}`);
    });
});