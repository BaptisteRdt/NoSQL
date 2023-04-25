// Récupération de la db 
const { request } = require('http');
const database = require('../config/database');
const { response } = require('express');

const TweetController = {
    findAll : async (request, response) =>{
        try {
            const db = await database
            // On récupère tous les pokémons
            const tweets = await db.collection('Tweets').find({}).toArray();
            response.json(tweets)     
        } catch (error) {
            // Gestions des erreurs 
            response.status(500).json(error.message)
        }
    },

    findTweetsFromAuthor : async (request, response) =>{
        try {
            const db = await database
            // On récupère tous les tweets d'un auteur 
            const tweets_from_author = await db.collection('Tweets').find({author: request}).toArray();
            response.json(tweets_from_author)
        } catch (error) {
            // Gestions des erreurs 
            response.status(500).json(error.message)
        }
    }
}

module.exports = TweetController;