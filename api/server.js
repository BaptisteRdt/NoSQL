require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});