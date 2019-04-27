import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Toolbar from '../../components/Toolbar';
import './RecipeEdit.scss'

class RecipeEdit extends Component {
    state = {
        recipe: {
            userId: '',
            title: '',
            desc: '',
            ingredients: [''],
            directions: '',
            img: ''
        },
        redirectOnSave: false,
        redirectOnRemove: false,
        editorState: EditorState.createEmpty(),
        editorEl: React.createRef(),
        editRecipeState: false  //add or edit recipe
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            try {
                await this.props.loadRecipe(id)
                const recipeToDisplay = this.props.recipe;
                const directions = EditorState.createWithContent(convertFromRaw(JSON.parse(recipeToDisplay.directions)));
                this.setState({
                    recipe: recipeToDisplay,
                    editorState: directions,
                    editRecipeState: true
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            const recipe = { ...this.state.recipe, userId: this.props.currUser._id }
            this.setState({ recipe })
        }
    }

    async componentWillUnmount() {
        await this.props.clearRecipeToDisplay()
    }

    handleEditorChange = (editorState, ev = null) => {
        if (ev) ev.preventDefault();
        this.setState({ editorState });
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        this.setState({ editorState: newState });
    }

    handleChange = (field) => {
        return ev => {
            const recipe = { ...this.state.recipe, [field]: ev.target.value }
            this.setState({ recipe });
        }
    }

    handleIngredients = i => e => {
        let ingredients = [...this.state.recipe.ingredients]
        ingredients[i] = e.target.value;
        const recipe = { ...this.state.recipe, ingredients }
        this.setState({ ...this.state, recipe })
    }

    addIngredient = e => {
        e.preventDefault()
        const ingredients = this.state.recipe.ingredients.concat([''])
        const recipe = { ...this.state.recipe, ingredients }
        this.setState({ ...this.state, recipe })
    }

    removeIngredient = i => e => {
        e.preventDefault()
        const ingredients = [
            ...this.state.recipe.ingredients.slice(0, i),
            ...this.state.recipe.ingredients.slice(i + 1)
        ]
        const recipe = { ...this.state.recipe, ingredients }
        this.setState({ ...this.state, recipe })
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        let recipe = { ...this.state.recipe, directions: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) }
        await this.props.saveRecipe(recipe)
        this.setState({ redirectOnSave: true });
    }

    removeRecipe = async () => {
        await this.props.removeRecipe(this.state.recipe)
        this.setState({ redirectOnRemove: true })
    }

    render() {
        const { recipe, redirectOnSave, editRecipeState, redirectOnRemove } = this.state;

        if (redirectOnSave) return <Redirect to={`/user/${this.props.currUser._id}`} />;
        else if (redirectOnRemove) return <Redirect to="/" />;
        return (
            <section className="recipe-edit">
                {editRecipeState? 
                <h1 className="add-edit-title">Edit recipe</h1> : 
                <h1 className="add-edit-title">Add new recipe</h1>}
                {recipe.userId !== '' && 
                <form className="edit-form" onSubmit={this.handleSubmit}>
                    <label>Title:</label>
                    <input className="edit-input" type="text" value={recipe.title || ''} onChange={this.handleChange('title')} required />
                    <label>Description:</label>
                    <input className="edit-input" type="text" value={recipe.desc || ''} onChange={this.handleChange('desc')} required/>
                    <label>Image URL:</label>
                    <input className="edit-input" type="url" onChange={this.handleChange('img')} />
                    <label>Ingredients:</label>
                    <div className="dynamicInput">
                        {this.state.recipe.ingredients.map((ingredient, index) =>
                            <span className="ing-span" key={index}>
                                <input className="ing-input" placeholder="Enter an ingredient" type="text" onChange={this.handleIngredients(index)} value={ingredient} required/>
                                <button className="delete-btn" onClick={this.removeIngredient(index)}>X</button>
                            </span>
                        )}
                    </div>
                    <button className="add-ing-btn" onClick={this.addIngredient}>Add ingredient</button>
                    <label>Directions:</label>
                    <Toolbar editorState={this.state.editorState} editorEl={this.editorEl} RichUtils={RichUtils} stateChange={this.handleEditorChange} />
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.handleEditorChange}
                        ref={this.editorEl} />
                    <input type="submit" value="Save" />
                </form>}

                {editRecipeState && <button className="delete-recipe" onClick={this.removeRecipe}>Delete Recipe</button>}
            </section>
        )
    }
}

export default RecipeEdit;