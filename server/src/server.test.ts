import request from 'supertest';
import WebSocket from "ws";
import * as constants from './utils/constants'
import { delay, waitForWebSocketClient, convertImageToBase64, saveBase64AsImage, intervalSaveImage } from './utils';
import fs from 'fs';
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

    test('image with force false should return the same amount of file under imageRes dir', async () => {
        const channel = "image";
        const inputDirectory = path.join(__dirname, "image"),
            imageName = "image_test.jpg";
        const imageB64 = convertImageToBase64(inputDirectory, imageName);
        const expected = fs.readdirSync(path.join(__dirname, "image/imageRes")).length;
        client.on("message", (data: string) => expectedMsg = data);
        client.send(JSON.stringify({ channel, data: imageB64, force: false }));
        await waitForMessage();
        expect(expected).toEqual(fs.readdirSync(path.join(__dirname, "image/imageRes")).length); // poner el mensaje en \server\src\utils\constants.ts
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

describe('intervalSaveImage', () => {
    test('it should return false', () => {
        const result = intervalSaveImage({force:false});
        expect(result).toBeFalsy();
    });
    test('it should return true', () => {
        const result = intervalSaveImage({force:true});
        expect(result).toBeTruthy();
    });
    test('it should return false', () => {
        const result = intervalSaveImage();
        expect(result).toBeFalsy();
    });
    test('it should return false', () => {
        const result = intervalSaveImage();
        expect(result).toBeFalsy();
    });
    test('it should return false', () => {
        const result = intervalSaveImage({});
        expect(result).toBeFalsy();
    });
    test('it should return false', async () => {
        const result = intervalSaveImage({intervalSeconds: 5});
        expect(result).toBeFalsy();
        const result2 = intervalSaveImage({intervalSeconds: 10});
        expect(result2).toBeFalsy();
        await delay(3000);
        const result3 = intervalSaveImage({intervalSeconds: 2});
        expect(result3).toBeTruthy();
    });
})
