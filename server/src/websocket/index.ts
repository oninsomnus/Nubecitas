import { logger, constants } from '../utils';
import { routers } from "./routers";
import { IWebSocketChannel, IWebSocketError } from './types';
import { WebSocket } from 'ws'; 
import ws from 'ws';
export const wss = new ws.Server({ port: constants.PORTS.WS });

export const startWebsocketServer = () => {
    wss.on('connection', (ws: WebSocket) => {
        logger.info(constants.MESSAGES.WS_CONNECTION_STABLISHED);
        ws.on('message', (message: string) => {resolveMessage(ws, message)});
    });
}

const handleError = (args: IWebSocketError): null => {
    const { ws, errorMessage } = args;
    logger.error(errorMessage);
    ws.send(`Error: ${errorMessage}`);
    return null;
}

const resolveMessage = (ws: WebSocket, message: string): void | null => {
    console.log(message)
    try {
        const { channel, data } = JSON.parse(message);
        if(!data){ return handleError({ws, errorMessage: constants.ERRORS.WRONG_WS_TYPE}) }
        else if(!(channel in routers)){ return handleError({ws, errorMessage: constants.ERRORS.WRONG_CHANNEL(channel)}) };
        (routers as any)[channel]({ws, data, channel});
    } catch (error) {
        logger.error(error);
        return handleError({ws, errorMessage: constants.ERRORS.WRONG_WS_TYPE })
    }
}
