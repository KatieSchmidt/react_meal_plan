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
        <Link to={`/meal-plan/${mealplan._id}`} className="float-right">
          <i className="fas fa-edit" />
        </Link>
        <h2>{mealplan.planname}</h2>
        {totalcaloriesInfo}
        {mealplansInfo}
      </div>
    );
  }
}

export default MealplanItem;
