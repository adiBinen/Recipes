import React from 'react';
import RecipePreview from '../RecipePreview';
import { Link } from 'react-router-dom';

import './RecipeList.scss';

const RecipeList = ({ recipes }) => {
    const recipePreviews = recipes.map(recipe =>
        (<Link key={recipe._id} to={'/recipe/' + recipe._id}>
            <RecipePreview recipe={recipe} />
        </Link>)
    )
    return (
        <ul className="recipe-list">
            {recipePreviews}
        </ul>
    )
}

export default RecipeList;