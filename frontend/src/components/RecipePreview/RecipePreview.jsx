import React from 'react';
import Capitalize from '../../filters/Capitalize.js';
import './RecipePreview.scss';

const RecipePreview = ({recipe}) => {
    return (
        <li className="recipe-preview">
            <img className="preview-recipe-img" src={recipe.img} alt="recipe"/>
            <div className="details">
                <div className="preview-top-fold">
                    <h2><Capitalize str={recipe.title}/></h2>
                    <div className="starsNum">
                        <p>({recipe.starred.length})&nbsp;</p>
                        <i className="far fa-star"></i>
                    </div>
                </div>
                <p><Capitalize str={recipe.desc}/></p>
                {recipe.user && 
                    <div className="preview-by-user">
                        <img className="preview-user-img" src={recipe.user.img} alt="user"/>
                        <p>By:&nbsp;<Capitalize str={recipe.user.name}/></p>
                    </div>}
            </div>
        </li>
    )
}

export default RecipePreview;