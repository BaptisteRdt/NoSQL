require('dotenv').config();
const express = require('express');

const server = express();

server.use(express.json());
const userRouter = require('./app/routes/userRouter');
const tweetRouter = require('./app/routes/tweetRouter')

server.use('/', userRouter);
server.use('/', tweetRouter);

const port = process.env.PORT

server.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})