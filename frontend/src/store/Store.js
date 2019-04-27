import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import login from './reducers/LoginReducer';
import recipe from './reducers/RecipeReducer';
import user from './reducers/UserReducer';

export default createStore(
    combineReducers({
        login,
        recipe,
        user
    }),
    applyMiddleware(thunk)
);