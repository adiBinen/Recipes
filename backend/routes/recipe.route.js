const recipeService = require('../services/recipe.service');

const BASE_URL = '/api/recipe'

module.exports = (app) => {

    app.post(BASE_URL, async (req, res) => {
        const newRecipe = req.body;
        let recipe;
        if (newRecipe._id) recipe = await recipeService.update(newRecipe);
        else recipe = await recipeService.add(newRecipe);
        if (recipe) res.json(recipe);
        else res.status(500).end();
    });

    app.get(`${BASE_URL}/query/:searchQuery?`, async (req, res) => {
        let { searchQuery } = req.params
        const recipes = await recipeService.query(searchQuery);
        if (recipes) res.json(recipes);
        else res.status(404).end();
    })

    app.get(`${BASE_URL}/:recipeId`, async (req, res) => {
        const { recipeId } = req.params;
        const recipe = await recipeService.getById(recipeId);
        if (recipe) res.json(recipe);
        else res.status(404).end();
    })

    app.put(`${BASE_URL}/:recipeId`, async (req, res) => {
        const recipe = req.body;
        recipeService.update(recipe)
            .then(updatedRecipe => {
                res.json(updatedRecipe);
            })
    })

    app.delete(`${BASE_URL}/:recipeId`, async (req, res) => {
        const { recipeId } = req.params;
        try {
            await recipeService.remove(recipeId);
            res.status(200).end();
        } catch (err) {
            res.status(404).end();
        }
    });

    app.patch(`${BASE_URL}/:recipeId`, (req, res) => {
        const userIdStarredRecipe = req.body;
        recipeService.toggleStar(userIdStarredRecipe)
            .then(updatedRecipe => {
                if (updatedRecipe) return res.json(updatedRecipe);
                else res.status(404).end();
            })

    })

}