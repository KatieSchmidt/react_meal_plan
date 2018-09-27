import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMealById } from "../../actions/mealActions";
import AddIngredient from "./AddIngredient";

class Meal extends Component {
  componentDidMount() {
    if (this.props.match.params.meal_id) {
      this.props.getMealById(this.props.match.params.meal_id);
    }
  }
  componentWillReceiveProps() {}

  render() {
    const { meal } = this.props.meal;
    let mealContent;
    let mealIngredients;
    if (!meal) {
      mealContent = <div>Meal Not Found</div>;
    } else {
      mealContent = <div>{meal.mealname}</div>;
      mealIngredients = meal.ingredients.map(ingredient => {
        return <li key={ingredient._id}>{ingredient.ingredient}</li>;
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
  getMealById: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { getMealById }
)(Meal);
