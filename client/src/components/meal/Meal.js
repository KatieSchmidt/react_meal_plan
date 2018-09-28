import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMealById, deleteIngredient } from "../../actions/mealActions";
import AddIngredient from "./AddIngredient";

class Meal extends Component {
  componentDidMount() {
    if (this.props.match.params.meal_id) {
      this.props.getMealById(this.props.match.params.meal_id);
    }
  }

  componentWillReceiveProps(nextProps) {}

  onDeleteClick(id) {
    this.props.deleteIngredient(this.props.match.params.meal_id, id);
  }
  render() {
    const { meal } = this.props.meal;
    let mealContent;
    let mealIngredients;
    if (!meal) {
      mealContent = <div>Meal Not Found</div>;
    } else {
      mealContent = <div>{meal.mealname}</div>;
      mealIngredients = meal.ingredients.map(ingredient => {
        return (
          <li key={ingredient._id}>
            {ingredient.ingredient} - {ingredient.calories}
            <button onClick={this.onDeleteClick.bind(this, ingredient._id)}>
              Delete
            </button>
          </li>
        );
      });
    }
    return (
      <div>
        <h1>Meal Component</h1>
        {mealContent}
        <ul>{mealIngredients}</ul>

        <AddIngredient meal={this.props.meal} />
      </div>
    );
  }
}

Meal.propTypes = {
  deleteIngredient: PropTypes.func.isRequired,
  getMealById: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { getMealById, deleteIngredient }
)(Meal);
