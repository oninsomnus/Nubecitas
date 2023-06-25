import express from 'express';
import path from 'path';
import ws from 'ws';
import fs from 'fs';

const PORT = 3000;
const WS_PORT = 3500;
const LOG_FILE = path.join(__dirname, "logs/texts.log");

const app = express();
const wss = new ws.Server({ port: WS_PORT });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

wss.on('connection', (ws: any) => {
    
    ws.on('camera', (data: any) => {

    });

    ws.on('text', (data: string) => {
        addLineToFile(data);
    });
});

const addLineToFile = (text: string): void => {
    if(!fs.existsSync(LOG_FILE)) createLogFile();
    fs.appendFileSync(LOG_FILE, parseText(text));
}

const parseText = (text: string): string => {
    return `${new Date()}: ${text}`;
};

const createLogFile = () => fs.writeFileSync(LOG_FILE, "");

addLineToFile("example");