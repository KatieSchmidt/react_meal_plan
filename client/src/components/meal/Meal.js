import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMealById } from "../../actions/mealActions";

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
    if (!meal) {
      mealContent = <div>Meal Not Found</div>;
    } else {
      mealContent = <div>{meal.mealname}</div>;
    }
    return (
      <div>
        <h1>Meal Component</h1>
        {mealContent}
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
