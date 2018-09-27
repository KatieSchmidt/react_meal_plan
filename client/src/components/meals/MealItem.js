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
      <div>
        <h1>Meal Item Component</h1>
        <h3>{meal.mealname}</h3>
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
