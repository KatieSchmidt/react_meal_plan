import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Meals from "./components/meals/Meals";
import CreateMeal from "./components/meal/CreateMeal";
import Meal from "./components/meal/Meal";
import Navbar from "./components/navbar/Navbar";
import AddIngredient from "./components/meal/AddIngredient";
import CreateMealplan from "./components/mealplan/CreateMealplan";
import Mealplan from "./components/mealplan/Mealplan";
import Mealplans from "./components/mealplans/Mealplans";
import GroceryList from "./components/grocerylist/GroceryList";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
