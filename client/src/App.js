import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Meals from "./components/meals/Meals";
import Meal from "./components/meal/Meal";
import Navbar from "./components/navbar/Navbar";
import AddIngredient from "./components/meal/AddIngredient";
import Mealplan from "./components/mealplan/Mealplan";
import Mealplans from "./components/mealplans/Mealplans";
import GroceryList from "./components/grocerylist/GroceryList";
import EditGroceryList from "./components/grocerylist/EditGroceryList";
import Weekplan from "./components/weekplan/Weekplan";
import Weekplans from "./components/weekplans/Weekplans";
import WeeklyGroceryList from "./components/weeklygrocerylist/WeeklyGroceryList";
import EditWeeklyGroceryList from "./components/weeklygrocerylist/EditWeeklyGroceryList";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/meals" component={Meals} />

            <Route exact path="/meals/:meal_id" component={Meal} />

            <Route
              exact
              path="/meals/:meal_id/ingredient"
              component={AddIngredient}
            />

            <Route exact path="/meal-plan" component={Mealplans} />
            <Route exact path="/meal-plan/:mealplan_id" component={Mealplan} />
            <Route
              exact
              path="/grocery-list/:mealplan_id"
              component={GroceryList}
            />
            <Route
              exact
              path="/grocery-list/:mealplan_id/edit"
              component={EditGroceryList}
            />
            <Route exact path="/week-plan/" component={Weekplans} />

            <Route exact path="/week-plan/:week_plan_id" component={Weekplan} />
            <Route
              exact
              path="/weekly-grocery-list/:week_plan_id"
              component={WeeklyGroceryList}
            />
            <Route
              exact
              path="/weekly-grocery-list/:week_plan_id/edit"
              component={EditWeeklyGroceryList}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
