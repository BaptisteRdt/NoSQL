const tweetModel = require('../models/tweetModel');
const commentModel = require('../models/commentModel');


// Add an article 

async function addTweet(req, res) {
    try {
        const {content} = req.body;
        const tweet = new tweetModel({
            content,
            author: req.payload._id
        });
        await tweet.save();
        res.status(200).json({message: "Tweet added"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Get all articles
async function getAllTweets(req, res) {
    try {
        const tweets = await tweetModel.find();
        const tweetsWithComments = await Promise.all(
            tweets.map(async (tweet) =>{
                const comments = await commentModel.find({tweet_ID: tweet._id}, {_id: 0, content:1});
                return {...tweet.toObject(), comments}
            })
        )
        res.json(tweetsWithComments);
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Update a tweet
async function updateTweet(req, res) {
    try {
        const {content} = req.body;
        const tweet = await tweetModel.findById({_id: req.params.id, author:req.payload._id});
        if(!tweet) {
            return res.status(404).json({message: 'Tweet not found'})
        };
        tweet.content = content;
        const updateTweet = await tweet.save()
        res.status(200).json(updateTweet)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// delete article 
async function deleteTweet(req, res) {
    try {
        const tweet = await tweetModel.findById({_id: req.params.id, author: req.payload._id});
        if(!tweet) {
            return res.status(404).json({message: 'Tweet not found'})
        };
        await tweet.deleteOne();
        res.json({message: 'Tweet deleted'});
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get article by category 
async function getTweetsByAuthor(req, res) {
    try {
        const tweets = await tweetModel.find({author: req.params.category});
        const TweetsWithComments = await Promise.all(
            tweets.map(async (tweet) =>{
                const comments = await commentModel.find({author_ID: author._id}, {_id: 0, content:1});
                return {...tweet.toObject(), comments}
            })
        )
        res.json(TweetsWithComments);
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    addTweet,
    getAllTweets,
    updateTweet,
    deleteTweet,
    getTweetsByAuthor
}