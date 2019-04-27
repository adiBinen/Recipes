import RecipeService from '../../services/RecipeService';

export const loadRecipes = (searchQuery = '') => {
    return async (dispatch) => {
        try {
            const recipes = await RecipeService.query(searchQuery);
            dispatch({ type: 'LOAD_RECIPES', recipes })
        } catch (err) {
            dispatch({type: 'LOAD_RECIPES', recipes: []})
        }
    }
}

export const loadRecipe = (recipeId) => {
    return async (dispatch) => {
        try {
            const recipe = await RecipeService.getById(recipeId);
            dispatch({type: 'SET_RECIPE', recipe})
        } catch(err) {
            console.log(err);
        }
    }
}

export const saveRecipe = (recipe) => {
    return async (dispatch) => {
        if (recipe._id) {
            try {
                const updatedRecipe = await RecipeService.update(recipe);
                dispatch({type: 'UPDATE_RECIPE', updatedRecipe})
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const newRecipe = await RecipeService.add(recipe);
                dispatch({type: 'ADD_RECIPE', newRecipe})
            } catch (err) {
                console.log(err);
            }
        }
    }
}

export const removeRecipe = (recipe) => {
    return async (dispatch) => {
       await RecipeService.remove(recipe._id);
        dispatch({type: 'REMOVE_RECIPE', recipe})
    }
}

export const clearRecipeToDisplay = () => {
    return (dispatch) => {
        dispatch({type: 'SET_RECIPE', recipe: null })
    }
}

export const toggleStarRecipe = (userIdStarredRecipe) => {
    return async (dispatch) => {
        const updatedRecipe = await RecipeService.toggleStar(userIdStarredRecipe)
        dispatch({type: 'SET_RECIPE', recipe: updatedRecipe })
    }
}