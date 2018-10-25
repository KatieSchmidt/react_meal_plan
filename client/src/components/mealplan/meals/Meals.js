import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getMeals } from "../../../actions/mealActions";
import { addMealToMealplan } from "../../../actions/mealplanActions";
import MealItem from "./MealItem";

class Meals extends Component {
  componentDidMount() {
    this.props.getMeals();
  }
  componentWillReceiveProps() {}

  onAddMealClick(meal_id, history) {
    this.props.addMealToMealplan(
      this.props.match.params.mealplan_id,
      meal_id,
      history
    );
  }

  render() {
    const { meals } = this.props.meal;
    let mealItems;
    if (meals) {
      mealItems = meals.map(meal => (
        <div className="meal-items col m-2" key={meal._id + "mealItemDiv"}>
          <MealItem meal={meal} />
          <button
            className="add-meal-button"
            onClick={this.onAddMealClick.bind(this, meal._id)}
          >
            Add Meal
          </button>
        </div>
      ));
    } else {
      mealItems = (
        <button className="text-center btn btn-success add-meal-link-button">
          <Link to="/meals" className="add-meal-link-button ">
            Create Meal
          </Link>
        </button>
      );
    }
    return (
      <div className="container">
        <div className="text-center">{mealItems}</div>
      </div>
    );
  }
}

Meals.propTypes = {
  addMealToMealplan: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { getMeals, addMealToMealplan }
)(withRouter(Meals));
