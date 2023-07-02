import express from 'express';
import { logger } from "../utils/logger";

const app = express();
const port = 3500;

app.get('/', (req, res) => {
    logger.error("This is an error log");
    logger.warn("This is a warn log");
    logger.info("This is a info log");
    logger.http("This is a http log");
    logger.debug("This is a debug log");
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});