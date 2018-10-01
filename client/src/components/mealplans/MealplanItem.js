import React, { Component } from "react";
import { Link } from "react-router-dom";

class MealplanItem extends Component {
  render() {
    const { mealplan } = this.props;
    let mealplansInfo;
    let totalcaloriesInfo;

    if (mealplan.totalcalories) {
      totalcaloriesInfo = (
        <h4 className="total-calories"> {mealplan.totalcalories} Calories</h4>
      );
    } else {
      totalcaloriesInfo = (
        <h4 className="total-calories">No calories listed</h4>
      );
    }

    if (mealplan.meals) {
      mealplansInfo = (
        <h4 className="total-meals"> {mealplan.meals.length} Meals</h4>
      );
    } else {
      mealplansInfo = <h4 className="total-meals">No meals listed</h4>;
    }

    return (
      <div className="mealplan-item-component">
        <h2>{mealplan.planname}</h2>
        {totalcaloriesInfo}
        {mealplansInfo}
        <Link to={`/meal-plan/${mealplan._id}`}>Edit Mealplan</Link>
      </div>
    );
  }
}

export default MealplanItem;
