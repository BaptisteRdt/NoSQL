const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.DB_URI);

module.exports = client.connect().then(mongoClient => mongoClient.db('Twitter'));