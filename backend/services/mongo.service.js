var dbConnection = null;

function connectToMongo() {
    if (dbConnection) return Promise.resolve(dbConnection);
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb+srv://recipesAdmin:recipes123@recipes-0y6b2.mongodb.net/recipe_db?retryWrites=true';

    return MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => {
            console.log('Connected to MongoDB');
            client.on('close', () => {
                console.log('MongoDB Diconnected!');
                dbConnection = null;
            })
            dbConnection = client.db()
            return dbConnection;
        })
}


module.exports = {
    connect: connectToMongo,
}
