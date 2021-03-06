import React, { Component } from "react";

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
      <div>
        <h2>{meal.mealname}</h2>
        {caloriesInfo}
        {ingredientsInfo}
      </div>
    );
  }
}

export default MealItem;
