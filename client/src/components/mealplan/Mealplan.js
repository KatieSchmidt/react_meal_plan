import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  getMealplanById,
  deleteMealplan,
  deleteMealFromMealplan
} from "../../actions/mealplanActions";
import { createGroceryList } from "../../actions/grocerylistActions";
import Meals from "./meals/Meals";

class Mealplan extends Component {
  componentDidMount() {
    if (this.props.match.params.mealplan_id) {
      this.props.getMealplanById(this.props.match.params.mealplan_id);
    }
  }

  onDeleteMealplanClick() {
    this.props.deleteMealplan(
      this.props.match.params.mealplan_id,
      this.props.history
    );
  }
  onCreateGroceryListClick() {
    this.props.createGroceryList(
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
    let noMealContent;
    let mealsInfo;

    if (!mealplan) {
      mealplanContent = <div>Mealplan Not Found</div>;
    } else {
      mealplanContent = (
        <div>
          <div className="text-center">
            <h1>
              {mealplan.planname.toUpperCase()} - {mealplan.totalcalories}{" "}
              Calories
            </h1>
          </div>
          <div className="text-center">
            <button
              className=" ml-2 btn btn-sm btn-danger"
              onClick={this.onDeleteMealplanClick.bind(this)}
            >
              Delete
            </button>
            <button
              className=" ml-2 btn btn-sm btn-warning"
              onClick={this.onCreateGroceryListClick.bind(this)}
            >
              Get Grocery List
            </button>
          </div>
        </div>
      );

      if (mealplan.meals.length > 0) {
        mealContent = mealplan.meals.map(meal => {
          return (
            <li className="text-center" key={meal._id + "meal"}>
              {meal.mealname}
              <button
                className="m-1 btn btn-sm btn-danger"
                onClick={this.onDeleteMealFromMealplanClick.bind(
                  this,
                  meal._id
                )}
              >
                <i className="fa fa-times" />
              </button>
            </li>
          );
        });
      } else {
        noMealContent = (
          <li className="text-center">There are no meals yet.</li>
        );
      }
    }

    return (
      <div>
        {mealplanContent}
        <h3>Current Meals In This Mealplan</h3>
        <ul className="list-unstyled">{mealContent || noMealContent}</ul>
        <h3>Add Meals To Your Plan</h3>
        <Meals />
      </div>
    );
  }
}

Mealplan.propTypes = {
  deleteMealFromMealplan: PropTypes.func.isRequired,
  deleteMealplan: PropTypes.func.isRequired,
  createGroceryList: PropTypes.func.isRequired,
  getMealplanById: PropTypes.func.isRequired,
  mealplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealplan: state.mealplan
});

export default connect(
  mapStateToProps,
  { getMealplanById, deleteMealplan, deleteMealFromMealplan, createGroceryList }
)(withRouter(Mealplan));
