import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getMealsByUser } from "../../../actions/mealActions";
import { addMealToMealplan } from "../../../actions/mealplanActions";
import MealItem from "./MealItem";

class Meals extends Component {
  componentDidMount() {
    this.props.getMealsByUser(this.props.auth.user.id);
  }

  onAddMealClick(meal_id, history) {
    this.props.addMealToMealplan(
      this.props.match.params.mealplan_id,
      meal_id,
      history
    );
  }

  render() {
    const { meals } = this.props.meal;
    let mealItems;
    if (meals) {
      mealItems = meals.map(meal => (
        <div className="list-item" key={meal._id + "mealItemDiv"}>
          <MealItem meal={meal} />
          <button
            className="btn btn-success"
            onClick={this.onAddMealClick.bind(this, meal._id)}
          >
            Add Meal
          </button>
        </div>
      ));
    } else {
      mealItems = (
        <button className="text-center btn btn-success">
          <Link to="/meals">Create Meal</Link>
        </button>
      );
    }
    return (
      <div className="component">
        <div className="list">{mealItems}</div>
      </div>
    );
  }
}

Meals.propTypes = {
  addMealToMealplan: PropTypes.func.isRequired,
  getMealsByUser: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMealsByUser, addMealToMealplan }
)(withRouter(Meals));
