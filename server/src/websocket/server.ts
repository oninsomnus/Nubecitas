import { logger } from '../utils/logger';
import * as constants from '../utils/constants';

import ws from 'ws';
export const wss = new ws.Server({ port: constants.PORTS.WS });

export const startWebsocketServer = () => {
    wss.on('connection', (ws: any) => {
        logger.info(`[ws] Connection detected`);
        ws.on('message', (data: string) => {
            ws.send(data);
            logger.info(`[ws] ${data}`);
        });
    });
}
