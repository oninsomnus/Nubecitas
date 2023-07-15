import { logger, constants } from "../../utils/";

export const listen = () => 
    logger.info(constants.MESSAGES.PORT_LISTENING);

export const ping = (req: any, res: any) => 
    res.send(constants.MESSAGES.PONG);

export const root = (req: any, res: any) => { 
    logger.info(constants.MESSAGES.HTTP_CONNECTION_STABLISHED);
    res.send('holis');
};