import express from 'express';
const app = express();
const port = 3500;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});