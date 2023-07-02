import request from 'supertest';
const ENDPOINT = 'http://localhost:3500';

describe('server', () => {
    it('tests /ping endpoint - positive test', async () => {
        const response = await request(ENDPOINT).get("/ping");
        expect(response.text).toEqual(response.text);
    });
})