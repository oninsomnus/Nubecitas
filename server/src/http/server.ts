import { logger } from '../utils/logger';
import express from 'express';

import * as constants from '../utils/constants';
import * as controllers from './controllers';
export const app = express();

export const startHttpServer = () => {
    app.get(constants.HTTP_PATHS.ROOT, (req, res) => controllers.root(req, res));
    app.get(constants.HTTP_PATHS.TEST, (req, res) => controllers.ping(req, res));
    app.listen(constants.PORTS.HTTP, () => controllers.listen());
}
