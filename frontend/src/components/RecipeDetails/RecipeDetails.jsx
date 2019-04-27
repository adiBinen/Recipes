import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Capitalize from '../../filters/Capitalize.js';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import './RecipeDetails.scss';

const RecipeDetails = (props) => {
  const [recipeId, setRecipeId] = useState(null);
  const { recipe, currUser } = props;

  useEffect(() => {
    if (recipeId !== props.match.params.recipeId) {
      setRecipeId(props.match.params.recipeId);
      props.loadRecipe(props.match.params.recipeId);
    }
    return () => {
      props.clearRecipeToDisplay();
    }
  }, [props.match.params.recipeId])

  const handleStarClick = () => {
    props.toggleStarRecipe({userId: currUser._id, recipe});
  }

  const ingredients = recipe ? recipe.ingredients.map((ingredient, index) => <li key={index}><Capitalize str={ingredient} /></li>) : '';
  const didStarred = recipe? recipe.starred.some(userId => userId === currUser._id) : null;

  return recipe ? (
    <section className="recipe-details">
      <div className="recipe-img" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${recipe.img})` }}>
        <h1><Capitalize str={recipe.title} /></h1>
      </div>
      <div className="recipe-wrapper">
        <div className="details-desc">
          <h2>Description:</h2>
          {currUser._id === recipe.userId && <Link className="recipe-edit-link" to={`/recipe/edit/${recipe._id}`}>Edit</Link>}
        </div>

        <div className="recipe-desc-container">

          <div className="user-desc-container">
            <Link className="recipe-desc" to={`/user/${recipe.userId}`}>
              <img className="recipe-user-img" src={recipe.user.img} alt="user" />
              <p>Recipe by: <Capitalize str={recipe.user.name} /></p>
            </Link>
            <div className="recipe-starred-num">
              <button onClick={handleStarClick}>
                {didStarred ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
              </button>
              <p>({recipe.starred.length})</p>
            </div>
          </div>

          <p className="desc-txt"><Capitalize str={recipe.desc} /></p>
          
        </div>
        
        <h2>Ingredients:</h2>
        <ul className="ingrediendt-list">{ingredients}</ul>
        <h2>Directions:</h2>
        <Editor className="recipe-directions" editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.directions)))} readOnly />
      </div>
    </section>
  ) : null
}

export default RecipeDetails
