const {Schema, model} = require('../database');

const tweetSchema = new Schema ({
    content: {type : String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    publication_date :{type : Date, default: Date.now }
});

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;