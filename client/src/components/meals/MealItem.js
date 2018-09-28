import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

class MealItem extends Component {
  render() {
    const { meal } = this.props;
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
        <Link to={`/meals/${meal._id}`}>Edit Meal</Link>
      </div>
    );
  }
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired
};

export default MealItem;
