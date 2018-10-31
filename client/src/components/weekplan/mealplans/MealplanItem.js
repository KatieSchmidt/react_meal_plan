import React, { Component } from "react";

class MealplanItem extends Component {
  render() {
    const { mealplan } = this.props;
    let mealsInfo;
    let caloriesInfo;

    if (mealplan.totalcalories) {
      caloriesInfo = (
        <h4 className="total-calories"> {mealplan.totalcalories} Calories</h4>
      );
    } else {
      caloriesInfo = <h4 className="total-calories">No calories listed</h4>;
    }

    if (mealplan.meals.length >= 0) {
      mealsInfo = (
        <h4 className="total-ingredients"> {mealplan.meals.length} Meals</h4>
      );
    } else {
      mealsInfo = <h4 className="total-ingredients">No Meals listed</h4>;
    }

    return (
      <div>
        <h2>{mealplan.planname}</h2>
        {caloriesInfo}
        {mealsInfo}
      </div>
    );
  }
}

export default MealplanItem;
