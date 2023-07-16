import { logger, constants } from "../../utils";
import { IWebSocketChannel } from "../types";

export const test = (args: IWebSocketChannel) => {
    const { ws, data, channel } = args;
    ws.send(data);
    logger.info(constants.MESSAGES.WS_CHANNEL_LISTENED(channel, data));
}

export const image = (args: IWebSocketChannel) => {
    const { ws, data, channel } = args;
    logger.info("esta es la funcion image");
    ws.send('imagen recibida');    
}
