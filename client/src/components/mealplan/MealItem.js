import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { addMealToMealplan } from "../../actions/mealplanActions";

class MealItem extends Component {
  constructor(props) {
    super(props);

    this.onAddMealClick = this.onAddMealClick.bind(this);
  }

  onAddMealClick(mealplan_id, meal_id) {
    this.props.addMealToMealplan(mealplan_id, meal_id);
  }
  componentWillReceiveProps() {}
  render() {
    const { meal } = this.props;
    const { mealplan } = this.props;
    let ingredientsInfo;
    let caloriesInfo;

    if (meal.totalcalories) {
      caloriesInfo = (
        <h4 className="total-calories"> {meal.totalcalories} Calories</h4>
      );
    } else {
      caloriesInfo = <h4 className="total-calories">No calories listed</h4>;
    }

    if (meal.ingredients) {
      ingredientsInfo = (
        <h4 className="total-ingredients">
          {" "}
          {meal.ingredients.length} Ingredients
        </h4>
      );
    } else {
      ingredientsInfo = (
        <h4 className="total-ingredients">No ingredients listed</h4>
      );
    }

    return (
      <div className="meal-item-component">
        <h2>{meal.mealname}</h2>
        {caloriesInfo}
        {ingredientsInfo}
        <button onClick={this.onAddMealClick(mealplan._id, meal._id)}>
          Add Meal
        </button>
      </div>
    );
  }
}

MealItem.propTypes = {
  addMealToMealplan: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
  mealplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  mealplan: state.mealplan
});

export default connect(
  mapStateToProps,
  { addMealToMealplan }
)(withRouter(MealItem));
