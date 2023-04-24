const {Router} = require('express');

const router = Router();

// On appelle notre controller 
const tweetController = require('./controllers/tweetController');

router.get('/Twitter',  tweetController.findAll);

module.exports = router;