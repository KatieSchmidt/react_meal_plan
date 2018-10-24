import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMeal, getMealById } from "../../actions/mealActions";

class MealItem extends Component {
  // componentDidMount() {
  //   this.props.getMealById(this.props.meal._id);
  // }
  deleteMeal(id) {
    this.props.deleteMeal(id, this.props.history);
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
      <div className="meal-item-component">
        <h2>{meal.mealname}</h2>
        {caloriesInfo}
        {ingredientsInfo}

        <Link to={`/meals/${meal._id}`}>
          <i className="fas fa-edit float-right ml-2" />
        </Link>

        <div
          onClick={this.deleteMeal.bind(this, meal._id)}
          className="float-right"
        >
          <i className="far fa-trash-alt" />
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
