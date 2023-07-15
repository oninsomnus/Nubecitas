import express from 'express';
import { constants } from '../utils';
import * as controllers from './controllers';
export const app = express();

export const startHttpServer = () => {
    app.get(constants.HTTP_PATHS.ROOT, (req, res) => controllers.root(req, res));
    app.get(constants.HTTP_PATHS.TEST, (req, res) => controllers.ping(req, res));
    app.listen(constants.PORTS.HTTP, '0.0.0.0', () => controllers.listen());
}
