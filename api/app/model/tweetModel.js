const { Schema, model } = require("../config/database");
 
const tweetModel = new Schema({
    _id: { type: String, required: true},
    author: { type: String, required: true},
    content: { type: String, required: true}
});

const Tweet = model("Tweets", tweetModel);

module.exports = Tweet