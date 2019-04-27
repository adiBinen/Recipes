import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

import RecipeList from '../../components/RecipeList';
import Filter from '../../components/Filter';

class HomePage extends Component {
  state = {
    recipes: []
  }

  async componentDidMount() {
    try {
      await this.props.loadRecipes();
      const recipes = this.props.recipes;
      this.setState({ recipes })
    } catch (err) {
      console.log(err);
    }
  }

  async onFilter(searchQuery) {
    await this.props.loadRecipes(searchQuery);
    const recipes = this.props.recipes;
      this.setState({ recipes })
  }

  render() {
    const { recipes } = this.state;
    const { currUser } = this.props;
    return (
      <div className="home-page">
        <Filter onFilter={this.onFilter.bind(this)}/>
        {currUser && (<Link className="add-new-link" to={"/recipe/edit"} title="Add new recipe">
          <div className="add-new-btn">+</div>
        </Link>)}
        <RecipeList recipes={recipes} />
      </div>
    );
  }
}

export default HomePage;
