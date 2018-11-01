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
          <div className="text-center">
            <h1>
              {weekplan.planname.toUpperCase()} - {weekplan.totalcalories}{" "}
              Calories
            </h1>
          </div>
          <div className="text-center">
            <button
              className=" ml-2 btn btn-sm btn-danger"
              onClick={this.onDeleteWeekplanClick.bind(this)}
            >
              Delete
            </button>
            <button
              className=" ml-2 btn btn-sm btn-warning"
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
            <li className="text-center" key={mealplan._id + "meal" + index}>
              {mealplan.planname}
              <button
                className="m-1 btn btn-sm btn-danger"
                onClick={this.onDeleteMealplanFromWeekplanClick.bind(
                  this,
                  mealplan._id
                )}
              >
                <i className="fa fa-times" />
              </button>
            </li>
          );
        });
      } else {
        noWeekContent = (
          <li className="text-center">There are no meals yet.</li>
        );
      }
    }

    return (
      <div>
        {weekplanContent}
        <h3>Current Mealplans In This Weekplan</h3>
        <ul className="list-unstyled">{weekContent || noWeekContent}</ul>
        <h3>Add Mealplans To Your Plan</h3>
        <Link to={`/meal-plan`} className="text-center">
          <p>Mealplan Not listed? Create a mealplan now!</p>
        </Link>
        <Mealplans />
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
  weekplan: state.weekplan
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
