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
        client.send(JSON.stringify({ channel: "test", data: testMsg }));
        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toEqual(testMsg);
    });

    test('it should return an error message', async () => {
        let expectedMsg: any;
        const testMsg = "Test message";
        const client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        await waitForWebSocketClient(client);
        client.on("message", (data) => expectedMsg = data);

        client.send(testMsg); //prueba

        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_WS_TYPE}`);
    });

    test('no channel attribute', async () => {
        let expectedMsg: any;
        const testMsg = "Test message";
        const client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        let channel;
        await waitForWebSocketClient(client);
        client.on("message", (data) => expectedMsg = data);

        client.send(JSON.stringify({ data: testMsg })); //prueba

        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_CHANNEL(channel)}`);
    });

    test('no data attribute', async () => {
        let expectedMsg: any;
        const testMsg = "Test message";
        const client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        await waitForWebSocketClient(client);
        client.on("message", (data) => expectedMsg = data);

        client.send(JSON.stringify({ channel: "test" })); //prueba

        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_WS_TYPE}`);
    });

    test('wrong channel', async () => {
        let expectedMsg: any;
        const testMsg = "Test message";
        const channel = "Bard"
        const client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        await waitForWebSocketClient(client);
        client.on("message", (data) => expectedMsg = data);

        client.send(JSON.stringify({ channel, data: "example" })); //prueba

        await new Promise(async resolve => {
            while (!expectedMsg) await delay(1000);
            resolve(true);
        });
        client.close();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_CHANNEL(channel)}`);
    });

    test('transform image', () => {
        // dado equis imagen (test-file folder)
        // fs module
        // read image
        // recibir un base64 url...
    })
});
