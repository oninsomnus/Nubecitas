import request from 'supertest';
import WebSocket from "ws";
import * as constants from './utils/constants'
import { delay, waitForWebSocketClient, convertImageToBase64, saveBase64AsImage } from './utils';
import { type } from 'os';
import path from 'path';

describe('http server', () => {
    test('it should return "pong"', async () => {
        const response = await request(constants.ENDPOINTS.DEV.HTTP).get(constants.HTTP_PATHS.TEST);
        expect(response.text).toEqual(response.text);
    });
});

describe('ws server', () => {
    let client: WebSocket;
    let expectedMsg: string | undefined;
    const testMsg = "Test message";

    const waitForMessage = async () => {
        await new Promise(async resolve => {
            while (!expectedMsg) await delay(200);
            resolve(true);
        });
    }

    beforeAll(async () => {
        client = new WebSocket(constants.ENDPOINTS.DEV.WS);
        await waitForWebSocketClient(client);
    });

    afterEach(() => {
        expectedMsg = undefined;
    });

    afterAll(() => {
        client.close();
    });

    test('it should return the expected test message', async () => {
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ channel: "test", data: testMsg }));
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(testMsg);
    });

    test('it should return an error message', async () => {
        client.on("message", (data: string) => expectedMsg = data);
        client.send(testMsg); //prueba
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_WS_TYPE}`);
    });

    test('no channel attribute', async () => {
        let channel;
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ data: testMsg })); //prueba
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_CHANNEL(channel)}`);
    });

    test('no data attribute', async () => {
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ channel: "test" })); //prueba
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_WS_TYPE}`);
    });

    test('wrong channel', async () => {
        const channel = "Bard"
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ channel, data: "example" })); //prueba
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(`Error: ${constants.ERRORS.WRONG_CHANNEL(channel)}`);
    });

    test('image', async () => {
        const channel = "image";
        const inputDirectory = path.join(__dirname, "image"),
            imageName = "image_test.jpg";
        const imageB64 = convertImageToBase64(inputDirectory, imageName);
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ channel, data: imageB64 }));
        await waitForMessage();
        expect(expectedMsg.toString()).toEqual(`imagen recibida`); // poner el mensaje en \server\src\utils\constants.ts
    });

    test('saveBase64AsImage', async() => {
        const outputDirectory = path.join(__dirname, "image", "imageRes"),
            inputDirectory = path.join(__dirname, "image"),
            imageName = "image_test.jpg",
            imageOutput = "output_image.jpg";
        
        const imageB64 = convertImageToBase64(inputDirectory, imageName);

        saveBase64AsImage(imageB64, outputDirectory, imageOutput);
    });
});
