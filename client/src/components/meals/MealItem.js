import React, { Component } from "react";
import PropTypes from "prop-types";

class MealItem extends Component {
  render() {
    const { meal } = this.props;
    return (
      <div>
        <h1>MealItem Component</h1>
        <h3>{meal.mealname}</h3>
      </div>
    );
  }
}

MealItem.propTypes = {
  meal: PropTypes.object.isRequired
};

export default MealItem;
