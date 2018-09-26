import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMeals } from "../../actions/mealActions";
import MealItem from "./MealItem";

class Meals extends Component {
  componentDidMount() {
    this.props.getMeals();
  }
  render() {
    const { meals } = this.props.meals;
    let mealItems;
    if (meals) {
      mealItems = meals.map(meal => <MealItem key={meal._id} meal={meal} />);
    }
    return (
      <div>
        <h1>Meals Component</h1>
        <div>{mealItems}</div>;
      </div>
    );
  }
}

Meals.propTypes = {
  getMeals: PropTypes.func.isRequired,
  meals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meals: state.meals
});

export default connect(
  mapStateToProps,
  { getMeals }
)(Meals);