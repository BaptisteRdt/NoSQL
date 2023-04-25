const {createClient} = require('redis');

const PREFIX = 'tweets';

const keys = [];

const TIMEOUT = 60 * 30;

const cache = async (request, response, next) => {
    // Créer un nouveau client redis
    const client = createClient();

    // gère es erreurs 
    client.on('error', (err) => console.log('Redis Client ERROR', err));

    // Connexion au client redis 
    await client.connect();

    // Création de a clé 
    // articles:/article
    const key = `${PREFIX}:${request.url}`;
    // Si on a la clés dans notre tableau keys
    if(keys.includes(key)) {
        // Récupérer la valeur de la clé depuis redis 
        const json = await client.get(key);

        const value = JSON.parse(json)

        response.json(value)
    } else {
        // remplacer la méthode response.json par une nouvelle méthode;
        const originalJson = response.json.bind(response);

        response.json = async (data) => {
            const jsonData = JSON.stringify(data);
            await client.set(key, jsonData);
            await client.expire(key, TIMEOUT);

            keys.push(key);

            originalJson(data)
        };
        next()
    }

};

const flush = async(request, response, next) => {
    console.log("je passe ici")
     // Créer un nouveau client redis
     const client = createClient();

     // gère es erreurs 
     client.on('error', (err) => console.log('Redis Client ERROR', err));
 
     // Connexion au client redis 
     await client.connect();
     for (const key of keys){
        console.log("Removing", key)
        await client.del(key)
     };
     keys.length = 0;
     next();
}


module.exports = {
    cache,
    flush
}