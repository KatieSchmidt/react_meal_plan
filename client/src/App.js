import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Meals from "./components/meals/Meals";
import CreateMeal from "./components/meal/CreateMeal";
import Meal from "./components/meal/Meal";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/create-meal" component={CreateMeal} />
            <Route exact path="/meals/:meal_id" component={Meal} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
