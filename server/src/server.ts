import express from 'express';
import path from 'path';
import ws from 'ws';
import fs from 'fs';

const PORT = 3000;
const WS_PORT = 3500;
const LOG_FOLDER = path.join(__dirname, "../", "/logs")
const LOG_FILE = path.join(LOG_FOLDER, "/texts.log");

const app = express();
const wss = new ws.Server({ port: WS_PORT });

app.get('/', (req, res) => {
    if(req.query.logger) addLineToFile(`[http]:${req.query.logger.toString()}`);
    res.send('Helslo World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

wss.on('connection', (ws: any) => {
    
    ws.on('camera', (data: any) => {

    });

    ws.on('text', (data: string) => {
        addLineToFile(`[ws]:${data}`);
    });
});

const addLineToFile = (text: string): void => {
    if(!fs.existsSync(LOG_FOLDER)) createLogFolder();
    if(!fs.existsSync(LOG_FILE)) createLogFile();
    fs.appendFileSync(LOG_FILE, parseText(text));
}

const parseText = (text: string): string => {
    return `${new Date()}: ${text}\n`;
};

const createLogFile = () => fs.writeFileSync(LOG_FILE, "");

const createLogFolder = () => fs.mkdirSync(LOG_FOLDER);
