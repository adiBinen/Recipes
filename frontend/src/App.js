import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginActions from './store/actions/LoginActions';
import * as recipeActions from './store/actions/RecipeActions';
import * as userActions from './store/actions/UserActions';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import RecipeEdit from './pages/RecipeEdit';
import Navbar from './components/Navbar';
import RecipeDetails from './components/RecipeDetails';
import UserDetails from './components/UserDetails';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route render={({ history }) => (
            <div className="App">
              <Navbar currUser={this.props.currUser} logout={this.props.logout} history={history} />
              <Switch>
                <Auth
                  exact path="/"
                  component={HomePage}
                  currUser={this.props.currUser}
                  loadRecipes={this.props.loadRecipes}
                  recipes={this.props.recipes}
                />
                <Route
                  path="/signup"
                  render={(props) => (<SignupPage {...props} signup={this.props.signup} />)}
                />
                <Route
                  path="/login"
                  render={(props) => (<LoginPage {...props} login={this.props.login} />)}
                />
                <Auth
                  path="/recipe/edit/:id?"
                  component={RecipeEdit}
                  loadRecipe={this.props.loadRecipe}
                  recipe={this.props.recipe}
                  saveRecipe={this.props.saveRecipe}
                  removeRecipe={this.props.removeRecipe}
                  currUser={this.props.currUser}
                  clearRecipeToDisplay={this.props.clearRecipeToDisplay}
                />
                <Auth
                  path='/recipe/:recipeId'
                  component={RecipeDetails}
                  loadRecipe={this.props.loadRecipe}
                  recipe={this.props.recipe}
                  clearRecipeToDisplay={this.props.clearRecipeToDisplay}
                  currUser={this.props.currUser}
                  toggleStarRecipe={this.props.toggleStarRecipe}
                />
                <Auth
                  path='/user/:userId'
                  component={UserDetails}
                  currUser={this.props.currUser}
                  user={this.props.user}
                  loadUser={this.props.loadUser}
                  clearUserToDisplay={this.props.clearUserToDisplay}
                />
              </Switch>
            </div>
          )} />
        </BrowserRouter>
      </div>
    );
  }
}

const Auth = ({ component: Component, ...rest }) => {
  const currUser = rest.currUser;
  return (
    <Route {...rest} render=
      {props =>
        currUser._id ?
          (<Component {...props}  {...rest} />) :
          (<Redirect to={{ pathname: "/login", state: currUser }} />)
      } />
  )
}

const mapStateToProps = (state) => {
  return {
    currUser: state.login.currUser,
    recipes: state.recipe.recipes,
    recipe: state.recipe.recipe,
    user: state.user.userToDisplay,
  }
}

const mapDispatchToProps = {
  ...loginActions,
  ...recipeActions,
  ...userActions
}

export default connect(mapStateToProps, mapDispatchToProps)(App);