import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMeals } from "../../actions/mealActions";
import MealItem from "./MealItem";
import CreateMeal from "../meal/CreateMeal";

class Meals extends Component {
  componentDidMount() {
    this.props.getMeals();
  }

  render() {
    const { meals } = this.props.meal;
    let mealItems;
    if (meals) {
      mealItems = meals.map(meal => (
        <MealItem key={meal._id + "mealItem"} meal={meal} />
      ));
    }
    return (
      <div>
        <CreateMeal />
        <div>{mealItems}</div>
      </div>
    );
  }
}

Meals.propTypes = {
  getMeals: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { getMeals }
)(Meals);
