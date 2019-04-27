const recipeReducer = (state = {
    recipes: [],
    recipe: null,
}, action) => {
    switch (action.type) {
        case 'LOAD_RECIPES':
            return {
                ...state,
                recipes: action.recipes
            }
        case 'SET_RECIPE':
            return {
                ...state,
                recipe: action.recipe,
            }
        case 'ADD_RECIPE':
            return {
                ...state,
                recipes: [...state.recipes, action.newRecipe]
            }
        case 'UPDATE_RECIPE':
            const updatedRecipes = state.recipes.map(recipe => {
                if (recipe._id === action.updatedRecipe._id) return action.updatedRecipe
                else return recipe
            })
            return {
                ...state,
                recipes: updatedRecipes
            }
        case 'REMOVE_RECIPE':
            const filteredRecipes = state.recipes.filter(recipe => recipe._id !== action.recipe._id)
            return {
                ...state,
                recipes: filteredRecipes
            }
        default:
            return state
    }
}

export default recipeReducer;