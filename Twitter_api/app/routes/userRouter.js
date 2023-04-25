const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signin', userController.signin);
//  GET, POST, PATCH , PUT, DELETE

router.post('/login', userController.login);

module.exports = router;