import Axios from 'axios';
const axios = Axios.create({ withCredentials: true });

const DEFAULT_IMG_URL = "https://images.unsplash.com/photo-1506368083636-6defb67639a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60";
const RECIPE_API = (process.env.NODE_ENV !== 'development')
    ? '/api/recipe'
    : '//localhost:3003/api/recipe';

export default {
    query,
    getById,
    add,
    update,
    remove,
    toggleStar
};

async function query(searchQuery) {
    try {
        const { data } = await axios.get(`${RECIPE_API}/query/${searchQuery}`)
        return data;
    } catch (err) {
        throw err;
    }
}

async function getById(recipeId) {
    try {
        const { data } = await axios.get(`${RECIPE_API}/${recipeId}`);
        return data;
    } catch (err) {
        throw err;
    }
}

async function add(recipe) {
    try {
        recipe.createdAt = Date.now();
        recipe.starred = [];
        if (recipe.img === '') recipe.img = DEFAULT_IMG_URL;
        const { data } = await axios.post(RECIPE_API, recipe);
        return data;
    } catch (err) {
        throw err;
    }
}

async function update(recipe) {
    try {
        if (recipe.img === '') recipe.img = DEFAULT_IMG_URL;
        const { data } = await axios.put(`${RECIPE_API}/${recipe._id}`, recipe);
        return data;
    } catch (err) {
        throw err;
    }
}

async function remove(id) {
    const res = await axios.delete(`${RECIPE_API}/${id}`);
    if (res.status === 200) return true;
    else return false;
}

async function toggleStar(userIdStarredRecipe) {
    try {
        const { data } = await axios.patch(`${RECIPE_API}/${userIdStarredRecipe.recipe._id}`, userIdStarredRecipe);
        return data;
    } catch (err) {
        throw err;
    }
}

// recipes = 
// [
//     { 
//     _id: 'recipe1',
//     userId: 'd2t3rgf9wdsd',
//     title: 'amazing chocolate cake',
//     ingredients: ['milk', 'cheese', 'flour'],
//     directions: 'lalalal lala',
//     createdAt: 93284784525,
//     img: "https://images.unsplash.com/photo-1506368083636-6defb67639a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
//     },
// ]

