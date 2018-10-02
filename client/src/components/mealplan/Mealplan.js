import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMealplanById,
  deleteMealplan,
  deleteMealFromMealplan
} from "../../actions/mealplanActions";
import Meals from "../meals/Meals";

class Mealplan extends Component {
  componentDidMount() {
    if (this.props.match.params.mealplan_id) {
      this.props.getMealplanById(this.props.match.params.mealplan_id);
    }
  }

  componentWillReceiveProps() {}

  onDeleteMealplanClick() {
    this.props.deleteMealplan(
      this.props.match.params.mealplan_id,
      this.props.history
    );
  }
  onDeleteMealFromMealplanClick(id) {
    this.props.deleteMealFromMealplan(
      this.props.match.params.mealplan_id,
      id,
      this.props.history
    );
  }
  render() {
    const { mealplan } = this.props.mealplan;
    let mealplanContent;
    let mealContent;
    if (!mealplan) {
      mealplanContent = <div>Mealplan Not Found</div>;
    } else {
      mealplanContent = <h1>{mealplan.planname.toUpperCase()}</h1>;
      mealContent = mealplan.meals.map(meal => {
        return (
          <li key={meal._id}>
            {meal._id}
            <button
              onClick={this.onDeleteMealFromMealplanClick.bind(this, meal._id)}
            >
              Delete Meal
            </button>
          </li>
        );
      });
    }
    return (
      <div>
        {mealplanContent}
        <button onClick={this.onDeleteMealplanClick.bind(this)}>
          Delete MealPlan
        </button>
        <ul>{mealContent}</ul>
        <h3>Add Meals To Your Plan</h3>
        <Meals />
      </div>
    );
  }
}

Mealplan.propTypes = {
  deleteMealFromMealplan: PropTypes.func.isRequired,
  deleteMealplan: PropTypes.func.isRequired,
  getMealplanById: PropTypes.func.isRequired,
  mealplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealplan: state.mealplan
});

export default connect(
  mapStateToProps,
  { getMealplanById, deleteMealplan, deleteMealFromMealplan }
)(Mealplan);
