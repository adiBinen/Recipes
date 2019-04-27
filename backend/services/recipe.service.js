const mongoService = require('./mongo.service');
const ObjectId = require('mongodb').ObjectId;

const recipesCollection = 'recipes';
const usersCollection = 'users';

module.exports = {
    query,
    getById,
    add,
    update,
    remove,
    toggleStar
}


async function query(searchQuery) {
    searchQuery = new RegExp(searchQuery, 'i');
    try {
        const db = await mongoService.connect();
        const recipes = await db.collection(recipesCollection)
            .aggregate([
                {
                    $match: { $or: [
                        { 'title': { $regex: searchQuery} },
                        { 'desc': { $regex: searchQuery} },
                        { 'ingredients': { $elemMatch: { $regex: searchQuery } } }
                    ]}
                },
                {
                    $lookup:
                    {
                        from: usersCollection,
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user',
                },
            ])
            .toArray();
        return recipes;
    } catch (err) {
        return null
    }
}

async function getById(recipeId) {
    try {
        const db = await mongoService.connect();
        const recipe = await db.collection(recipesCollection)
            .aggregate([
                {
                    $match: { _id: new ObjectId(recipeId) }
                },
                {
                    $lookup:
                    {
                        from: usersCollection,
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user',
                },
            ]).toArray();
        return recipe[0];
    } catch (err) {
        return null;
    }
}

async function add(recipe) {
    try {
        const userId = recipe.userId;
        recipe.userId = new ObjectId(userId);
        const db = await mongoService.connect();
        const { insertedId } = await db.collection(recipesCollection).insertOne(recipe);
        recipe._id = insertedId;
        recipe.userId = userId;
        return recipe;
    } catch (err) {
        return null;
    }
}

function update(recipe) {
    if (recipe.user) delete recipe.user
    const recipeId = recipe._id;
    const userId = recipe.userId;
    recipe._id = new ObjectId(recipe._id);
    recipe.userId = new ObjectId(recipe.userId);
    return mongoService.connect()
        .then(db => db.collection(recipesCollection).updateOne({ _id: recipe._id }, { $set: recipe }))
        .then(async res => {
            recipe._id = recipeId;
            recipe.userId = userId;
            return recipe;
        });
}

async function remove(id) {
    const db = await mongoService.connect()
    await db.collection(recipesCollection).deleteOne({ _id: new ObjectId(id) });
}

async function toggleStar({ recipe, userId }) {
    const objRecipeId = new ObjectId(recipe._id);
    const objUserId = new ObjectId(userId);
    const isStarred = recipe.starred.some(id => id === userId);
    try {
        const db = await mongoService.connect()
        var updatedRecipe;
        if (isStarred) {
            updatedRecipe = await db.collection(recipesCollection).updateOne({ _id: objRecipeId }, { $pull: { starred: objUserId } })
            recipe.starred = recipe.starred.filter(id => id !== userId);
        } else {
            updatedRecipe = await db.collection(recipesCollection).updateOne({ _id: objRecipeId }, { $push: { starred: objUserId } })
            recipe.starred.push(userId);
        }
        return recipe;
    } catch {
        return null;
    }
}