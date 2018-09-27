import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

class MealItem extends Component {
  render() {
    const { meal } = this.props;
    let ingredientList;
    if (meal.ingredients) {
      ingredientList = meal.ingredients.map(ingredient => (
        <li key={ingredient._id}>
          {ingredient.ingredient}-{ingredient.calories}
        </li>
      ));
    }
    return (
      <div className="meal-item-component">
        <h2>{meal.mealname}</h2>
        <h3 className="total-calories"> {meal.totalcalories} Calories</h3>
        <ul>{ingredientList}</ul>
        <Link to={`/meals/${meal._id}`}>Edit Meal</Link>
      </div>
    );
  }
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired
};

export default MealItem;
