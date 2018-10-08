import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
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
        <div>
          <MealItem meal={meal} />
          <button onClick={this.onAddMealClick.bind(this, meal._id)}>
            Add Meal
          </button>
        </div>
      ));
    }
    return (
      <div>
        <div>{mealItems}</div>
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
