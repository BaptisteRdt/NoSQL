const {Router} = require('express');

const router = Router();

// On appelle notre controller 
const tweetController = require('./controller/tweetController');

router.get('/Tweets',  tweetController.findAll);

router.get('/Tweets/:author', (req, res, next) => {
    const author = req.params.author;

    next.tweetController.findTweetsFromAuthor(author)
});

module.exports = router;