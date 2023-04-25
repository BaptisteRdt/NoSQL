require('dotenv').config();
const express = require('express');
const tweetRouter = require('./app/tweetRouter');

const app = express();

app.use(tweetRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});