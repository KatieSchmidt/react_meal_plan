import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getMealplans } from "../../../actions/mealplanActions";
import { addMealplanToWeekplan } from "../../../actions/weekplanActions";
import MealplanItem from "./MealplanItem";

class Mealplans extends Component {
  componentDidMount() {
    this.props.getMealplans();
  }

  onAddMealplanClick(mealplan_id, history) {
    this.props.addMealplanToWeekplan(
      this.props.match.params.week_plan_id,
      mealplan_id,
      history
    );
  }

  render() {
    const { mealplans } = this.props.mealplan;
    let mealplanItems;
    if (mealplans) {
      mealplanItems = mealplans.map(mealplan => (
        <div className="meal-items col m-2" key={mealplan._id + "mealItemDiv"}>
          <MealplanItem mealplan={mealplan} />
          <button
            className="add-meal-button btn btn-success"
            onClick={this.onAddMealplanClick.bind(this, mealplan._id)}
          >
            Add Mealplan
          </button>
        </div>
      ));
    } else {
      mealplanItems = (
        <button className="text-center btn btn-success add-meal-link-button">
          <Link to="/meal-plan" className="add-meal-link-button ">
            Create Mealplan
          </Link>
        </button>
      );
    }
    return (
      <div className="container">
        <div className="text-center">{mealplanItems}</div>
      </div>
    );
  }
}

Mealplans.propTypes = {
  addMealplanToWeekplan: PropTypes.func.isRequired,
  getMealplanss: PropTypes.func.isRequired,
  mealplans: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealplan: state.mealplan
});

export default connect(
  mapStateToProps,
  { getMealplans, addMealplanToWeekplan }
)(withRouter(Mealplans));
