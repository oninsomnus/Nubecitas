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
export const intervalDifference = (seconds: number, currentTimestamp: number): boolean => {
    const globalTimestamp = Number(process.env.TIMESTAMP);
    if(!globalTimestamp) process.env.TIMESTAMP = String(currentTimestamp);
    const timeDifferenceMinutes = (currentTimestamp - globalTimestamp) / 1000;
    return timeDifferenceMinutes > seconds;
}
export const intervalSaveImage = (args?:{intervalSeconds?: number, force?:boolean, esp?:string}): boolean => {
    if(args?.force) return args.force;
    if(!args?.intervalSeconds) return false;
    
    const currentTimestamp = Date.now();
    const isDifferent = intervalDifference(args.intervalSeconds, currentTimestamp);
    if(isDifferent) process.env.TIMESTAMP = String(currentTimestamp);
    return isDifferent;
}