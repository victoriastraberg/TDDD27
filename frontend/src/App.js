import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/nav/nav-bar.js";
import HomePage from "./components/home/homepage.js";
import FridgeList from "./components/fridge/fridge.js";
import ShoppinglistPage from "./components/shopping/shopping_list.js";
import RecipeList from "./components/recipes/recipes.js";
import Profile from "./components/profile/profile.js";
import { withAuth0 } from "@auth0/auth0-react";
import Loading from "./components/loading.js";
import ProtectedRoute from "./auth/protected-route.js";

/* Class for all the routes in the app */
class App extends React.Component {
  render() {
    // Loading before authenticated
    const { isLoading } = this.props.auth0;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="body">
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <ProtectedRoute path="/fridgelist" component={FridgeList} />
          <ProtectedRoute path="/shoppinglist" component={ShoppinglistPage} />
          <ProtectedRoute path="/recipelist" component={RecipeList} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default withAuth0(App);
