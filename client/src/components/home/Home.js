import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="col">
          <div className="row">
            <h1>Welcome to the Meal Planning App!</h1>
          </div>
          <div className="row">
            <h3 className="col col-12 text-left">Step 1</h3>
            <p className="col col-12">
              <a href="/register">Register</a> and <a href="/login">Log In</a>{" "}
              to begin planning.
            </p>
          </div>
          <div className="row">
            <h3 className="col col-12 text-left">Step 2</h3>
            <p className="col col-12">
              <a href="/meals">Create Meals</a> to add to a daily mealplan
            </p>
          </div>
          <div className="row">
            <h3 className="col col-12 text-left">Step 3</h3>
            <p className="col col-12">
              <a href="/meal-plan">Create Mealplans</a> for each day of the week
            </p>
          </div>
          <div className="row">
            <h3 className="col col-12 text-left">Step 4</h3>
            <p className="col col-12">
              <a href="/week-plan">Create a Weekly plan</a> for each week of the
              month. You can add your daily mealplans to it
            </p>
          </div>
          <div className="row">
            <h3 className="col col-12 text-left">Step 5</h3>
            <p className="col col-12">
              Then, you can checkout your weekly mealplan and get a specialized
              grocery list to make grocery shopping easy as pie!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
