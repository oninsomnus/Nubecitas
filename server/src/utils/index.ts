import { logger } from './logger';
import * as constants from './constants';
import fs from 'fs';
import path from 'path';

process.env.TIMESTAMP = null;

export { constants, logger };
export const delay = (sleepTime: number) => new Promise((resolve) => setTimeout(() => { resolve(true) }, sleepTime));
export const waitForWebSocketClient = async (client: any) => {
    await new Promise(async resolve => {
        while (client.readyState != client.OPEN) await delay(1000);
        resolve(true);
    })
};

export const convertImageToBase64 = (inputDirectory: string, imageName: string): string => {
    const imagePath = path.join(inputDirectory, imageName);
    const image = fs.readFileSync(imagePath, { encoding: 'base64' });
    return image;
}

export const saveBase64AsImage = (base64String: string, outputDirectory: string, imageName: string): string => {    
    const imageBuffer = Buffer.from(base64String, 'base64');
    const imagePath = path.join(outputDirectory, imageName);
    fs.writeFileSync(imagePath, imageBuffer);
    return imagePath;
}

export const intervalSaveImage = (args:{force?:boolean, esp?:string}): boolean => {
    console.log(args.force);
    return args.force;
}