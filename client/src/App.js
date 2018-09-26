import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Meals from "./components/meals/Meals";
import CreateMeal from "./components/meal/CreateMeal";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/create-meal" component={CreateMeal} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;