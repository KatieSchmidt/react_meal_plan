import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMeal, getMealById } from "../../actions/mealActions";

class MealItem extends Component {
  deleteMeal(id, user_id) {
    this.props.deleteMeal(id, user_id, this.props.history);
  }
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
      <div className="list-item">
        <h2 className="meal-item-component-header">{meal.mealname}</h2>
        {caloriesInfo}
        {ingredientsInfo}

        <div className="button-box">
          <Link to={`/meals/${meal._id}`} className="">
            <i className="fas fa-edit" />
          </Link>

          <div
            onClick={this.deleteMeal.bind(this, meal._id, meal.user)}
            className="meal-item-component-delete-button"
          >
            <i className="far fa-trash-alt delete-link" />
          </div>
        </div>
      </div>
    );
  }
}

MealItem.propTypes = {
  deleteMeal: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteMeal, getMealById }
)(withRouter(MealItem));
