import request from 'supertest';
import WebSocket from "ws";
import * as constants from './utils/constants'
import { delay, waitForWebSocketClient } from './utils';

describe('http server', () => {
    test('it should return "pong"', async () => {
        const response = await request(constants.ENDPOINTS.DEV.HTTP).get(constants.HTTP_PATHS.TEST);
        expect(response.text).toEqual(response.text);
    });
});

describe('ws server', () => {
    test('it should return the expected test message', async () => {
        let expectedMsg: any;
        const testMsg = "Test message";
        const client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        await waitForWebSocketClient(client);
        client.on("message", (data) => expectedMsg = data);
        client.send(testMsg);
        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toBe(testMsg);
   });
});