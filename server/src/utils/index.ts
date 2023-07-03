import { logger } from './logger';
import * as constants from './constants';

export { constants, logger };
export const delay = (sleepTime: number) => new Promise((resolve) => setTimeout(() => {resolve(true)}, sleepTime));
export const waitForWebSocketClient = async (client: any) => {
    await new Promise(async resolve => {
        while (client.readyState != client.OPEN) await delay(1000);
        resolve(true);
    })
};
