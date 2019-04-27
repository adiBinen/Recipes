const mongoService = require('./mongo.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    login,
    signup,
    remove,
    getById
}

const usersCollection = 'users';
const recipesCollection = 'recipes';

function query(userIds) {
    let mongoQuery = {}
    if (userIds) {
        userIds = userIds.map(userId => new ObjectId(userId))
        mongoQuery = { _id: { $in: userIds } }
    }
    return mongoService.connect()
        .then(db => db.collection(usersCollection)
            .find(mongoQuery)
            .sort()
            .toArray()
        );
}

async function login(credentials) {
    const db = await mongoService.connect()
    const user = await db.collection(usersCollection).findOne({ name: credentials.name })
    return user;
}

async function signup(user) {
    const db = await mongoService.connect();
    const loadedUser = await db.collection(usersCollection).findOne({ name: user.name })
    if (!loadedUser) {
        try {
            const { insertedId } = await db.collection(usersCollection).insertOne(user);
            user._id = insertedId;
            return user;
        } catch {
            throw (401);
        }
    } else throw (401);
}

function remove(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection(usersCollection).remove({ _id }));
}

async function getById(userId) {
    try {
        const db = await mongoService.connect();
        const user = await db.collection(usersCollection)
            .aggregate([
                {
                    $match: { _id: new ObjectId(userId) }
                },
                {
                    $lookup:
                    {
                        from: recipesCollection,
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'recipes'
                    }
                },
            ])
            .toArray();
        return user[0];
    } catch (err) {
        return null;
    }
}