import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
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
      this.props.auth.user.id,
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

    if (!mealplan) {
      mealplanContent = <div>Mealplan Not Found</div>;
    } else {
      mealplanContent = (
        <div>
          <h1 className="plan__name">{mealplan.planname}</h1>
          <h2 className="plan__calories">{mealplan.totalcalories} Calories</h2>
          <div className="plan__button-box">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onDeleteMealplanClick.bind(this)}
            >
              Delete Mealplan
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={this.onCreateGroceryListClick.bind(this)}
            >
              Get Grocery List
            </button>
          </div>
        </div>
      );

      if (mealplan.meals.length > 0) {
        mealContent = mealplan.meals.map((meal, index) => {
          return (
            <li className="plan__list-item" key={meal._id + "meal" + index}>
              <button
                className="btn btn-sm btn-danger"
                onClick={this.onDeleteMealFromMealplanClick.bind(
                  this,
                  meal._id
                )}
              >
                <i className="fa fa-times" />
              </button>
              {meal.mealname}
            </li>
          );
        });
      } else {
        noMealContent = (
          <li className="text-center">There are no meals yet.</li>
        );
      }
    }

    let addableContent = (
      <div className="addable__content">
        <h3 className="addable__content-header">Add Meals To Your Plan</h3>
        <Link to={`/meals`} className="text-center">
          <p>Meal Not listed? Create meal now!</p>
        </Link>
        <Meals />
      </div>
    );

    return (
      <div className="plan">
        {mealplanContent}
        <h3>Current Meals In This Mealplan</h3>
        <div className="plan__list-div">
          <ul className="list-unstyled plan__list">
            {mealContent || noMealContent}
          </ul>
        </div>

        {addableContent}
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
  mealplan: state.mealplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMealplanById, deleteMealplan, deleteMealFromMealplan, createGroceryList }
)(withRouter(Mealplan));
