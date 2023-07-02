import { logger } from "../../utils/logger";
import * as constants from '../../utils/constants';

export const listen = () => 
    logger.info(`Server app listening on port ${constants.PORTS.HTTP}`)

export const ping = (req: any, res: any) => 
    res.send('pong');

export const root = (req: any, res: any) => { 
    logger.info("Connection detected");
    res.send('Helloo Worlad!');
};