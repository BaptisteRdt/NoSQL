// Récupération de la db 
const database = require('../database');

const tweetController = {
    findAll : async (request, response) =>{
        try {
            const db = await database
            // On récupère tous les pokémons
            const pokemons = await db.collection('Tweets').find({}).toArray();
            response.json(pokemons)     
        } catch (error) {
            // Gestions des érreurs 
            response.status(500).json(error.message)
        }
    }
}

module.exports = mainController;