import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMealById,
  deleteIngredient,
  deleteMeal
} from "../../actions/mealActions";
import AddIngredient from "./AddIngredient";

class Meal extends Component {
  componentDidMount() {
    if (this.props.match.params.meal_id) {
      this.props.getMealById(this.props.match.params.meal_id);
    }
  }

  componentWillReceiveProps(nextProps) {}

  onDeleteMealClick() {
    this.props.deleteMeal(this.props.match.params.meal_id, this.props.history);
  }
  onDeleteIngredientClick(id) {
    this.props.deleteIngredient(this.props.match.params.meal_id, id);
  }
  render() {
    const { meal } = this.props.meal;
    let mealContent;
    let mealIngredients;
    if (!meal) {
      mealContent = <div>Meal Not Found</div>;
    } else {
      mealContent = <h1>{meal.mealname.toUpperCase()}</h1>;
      mealIngredients = meal.ingredients.map(ingredient => {
        return (
          <li key={ingredient._id}>
            {ingredient.ingredient} - {ingredient.calories}
            <button
              onClick={this.onDeleteIngredientClick.bind(this, ingredient._id)}
            >
              Delete
            </button>
          </li>
        );
      });
    }
    return (
      <div>
        {mealContent}
        <button onClick={this.onDeleteMealClick.bind(this)}>Delete Meal</button>
        <ul>{mealIngredients}</ul>
        <AddIngredient meal={this.props.meal} />
      </div>
    );
  }
}

Meal.propTypes = {
  deleteMeal: PropTypes.func.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  getMealById: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { getMealById, deleteIngredient, deleteMeal }
)(Meal);
