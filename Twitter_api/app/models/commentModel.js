const {Schema, model} = require('../database');

const commentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref : 'User', required: true},
    tweet_ID : {type: Schema.Types.ObjectId, ref : 'Tweet', required: true},
    content : {type: String, required: true},
    publication_date: {type: Date, default: Date.now}
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;