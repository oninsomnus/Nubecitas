import { logger } from '../utils/logger';
import * as constants from '../utils/constants';

import ws from 'ws';
export const wss = new ws.Server({ port: constants.PORTS.WS });

interface IWebSocketChannel{
    ws: any,
    data?: string,
    channel?: string
    errorMessage?: string
}

const testChannel = (args: IWebSocketChannel) => {
    const { ws, data, channel } = args;
    ws.send(data);
    logger.info(`[ws] channel: ${channel} data: ${data}`);
}

const imageChannel = () => {
    //transformar imagen
}

const router = {
    test: testChannel
}

const handleError = (args: IWebSocketChannel): null => {
    const { ws, data, channel, errorMessage } = args;
    logger.error(errorMessage);
    ws.send(`Error: ${errorMessage}`);
    return null;
}

const resolveMessage = (ws: any, message: string): void | null => {
    try {
        const { channel, data } = JSON.parse(message);
        if(!data){ return handleError({ws, channel, data, errorMessage: constants.ERRORS.WRONG_WS_TYPE}) }
        else if(!(channel in router)){ return handleError({ws, channel, data, errorMessage: constants.ERRORS.WRONG_CHANNEL(channel)}) };
        (router as any)[channel]({ws, data, channel});
    } catch (error) {
        return handleError({ws, errorMessage: constants.ERRORS.WRONG_WS_TYPE })
    }
}

export const startWebsocketServer = () => {
    wss.on('connection', (ws: any) => {
        logger.info(`[ws] Connection detected`);
        ws.on('message', (message: string) => {resolveMessage(ws, message)});
    });
}
