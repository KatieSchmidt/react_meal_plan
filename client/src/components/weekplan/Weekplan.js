import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  getWeekplanById,
  deleteWeekplan,
  deleteMealplanFromWeekplan
} from "../../actions/weekplanActions";
import Mealplans from "./mealplans/Mealplans";
import { createWeeklyGroceryList } from "../../actions/weeklygrocerylistActions";

class Weekplan extends Component {
  componentDidMount() {
    if (this.props.match.params.week_plan_id) {
      this.props.getWeekplanById(this.props.match.params.week_plan_id);
    }
  }

  onDeleteWeekplanClick() {
    this.props.deleteWeekplan(
      this.props.match.params.week_plan_id,
      this.props.auth.user.id,
      this.props.history
    );
  }
  onDeleteMealplanFromWeekplanClick(id) {
    this.props.deleteMealplanFromWeekplan(
      this.props.match.params.week_plan_id,
      id,
      this.props.history
    );
  }

  onCreateWeeklyGroceryListClick() {
    this.props.createWeeklyGroceryList(
      this.props.match.params.week_plan_id,
      this.props.history
    );
  }

  render() {
    const { weekplan } = this.props.weekplan;
    let weekplanContent;
    let weekContent;
    let noWeekContent;

    if (!weekplan) {
      weekplanContent = <div>Weekplan Not Found</div>;
    } else {
      weekplanContent = (
        <div>
          <h1 className="plan__name">{weekplan.planname}</h1>
          <h2 className="plan__calories">{weekplan.totalcalories} Calories</h2>
          <div className="plan__button-box">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onDeleteWeekplanClick.bind(this)}
            >
              Delete Weekplan
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={this.onCreateWeeklyGroceryListClick.bind(this)}
            >
              Get Grocery List
            </button>
          </div>
        </div>
      );

      if (weekplan.mealplans.length > 0) {
        weekContent = weekplan.mealplans.map((mealplan, index) => {
          return (
            <li className="plan__list-item" key={mealplan._id + "meal" + index}>
              <button
                className="btn btn-sm btn-danger"
                onClick={this.onDeleteMealplanFromWeekplanClick.bind(
                  this,
                  mealplan._id
                )}
              >
                <i className="fa fa-times" />
              </button>
              {mealplan.planname}
            </li>
          );
        });
      } else {
        noWeekContent = (
          <li className="text-center">There are no meals yet.</li>
        );
      }
    }

    let addableContent = (
      <div className="addable__content">
        <h3 className="addable__content-header">Add Meals To Your Plan</h3>
        <Link to={`/meal-plan`} className="text-center">
          <p>Mealplan Not listed? Create meal now!</p>
        </Link>
        <Mealplans />
      </div>
    );

    return (
      <div className="plan">
        {weekplanContent}
        <h3>Current Mealplans In This Weekplan</h3>
        <div className="plan__list-div">
          <ul className="list-unstyled">{weekContent || noWeekContent}</ul>
        </div>

        {addableContent}
      </div>
    );
  }
}

Weekplan.propTypes = {
  deleteMealplanFromWeekplan: PropTypes.func.isRequired,
  deleteWeekplan: PropTypes.func.isRequired,
  getWeekplanById: PropTypes.func.isRequired,
  weekplan: PropTypes.object.isRequired,
  createWeeklyGroceryList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  weekplan: state.weekplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getWeekplanById,
    deleteWeekplan,
    deleteMealplanFromWeekplan,
    createWeeklyGroceryList
  }
)(withRouter(Weekplan));
