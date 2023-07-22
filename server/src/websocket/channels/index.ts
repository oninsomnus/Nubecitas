import { logger, constants, saveBase64AsImage, intervalSaveImage } from "../../utils";
import { IWebSocketChannel } from "../types";
import fs from 'fs';
import path from 'path';

export const test = (args: IWebSocketChannel) => {
    const { ws, data, channel } = args;
    ws.send(data);
    logger.info(constants.MESSAGES.WS_CHANNEL_LISTENED(channel, data));
}

export const image = (args: IWebSocketChannel) => {
    const { ws, data, channel } = args;
    const outputDirectory = path.join(__dirname, "../", "../", "image", "imageRes"),
            imageOutput = Date.now() + "output_image.jpg";
    if(intervalSaveImage({force:true})){
        saveBase64AsImage(data, outputDirectory, imageOutput);
    }
    ws.send('imagen recibida');
}