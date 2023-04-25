const express = require('express');

const router = express.Router();

const tweetController = require('../controllers/tweetController');
const checkJwt = require('../../middlwares/checkJwt');
const {cache, flush} = require('../../middlwares/cache');

// Add one article 
router.post('/post/Tweet', flush, checkJwt, tweetController.addTweet);

// Get all articles 
router.get('/get/Tweet',cache,tweetController.getAllTweets);

// Update article 
router.put('/put/Tweet/:id',flush, checkJwt, tweetController.updateTweet);

// Delete article 
router.delete('/delete/Tweet/:id', flush, checkJwt, tweetController.deleteTweet);

// Get By category 
router.get('/get/Tweet/:category', tweetController.getTweetsByAuthor);

module.exports = router