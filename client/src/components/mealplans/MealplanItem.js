import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { deleteMealplan } from "../../actions/mealplanActions";

class MealplanItem extends Component {
  onDeleteMealplanClick(id) {
    this.props.deleteMealplan(id, this.props.history);
  }
  render() {
    const { mealplan } = this.props;
    let mealplansInfo;
    let totalcaloriesInfo;

    if (mealplan.totalcalories) {
      totalcaloriesInfo = (
        <h4 className="total-calories"> {mealplan.totalcalories} Calories</h4>
      );
    } else {
      totalcaloriesInfo = (
        <h4 className="total-calories">No calories listed</h4>
      );
    }

    if (mealplan.meals) {
      mealplansInfo = (
        <h4 className="total-meals"> {mealplan.meals.length} Meals</h4>
      );
    } else {
      mealplansInfo = <h4 className="total-meals">No meals listed</h4>;
    }

    return (
      <div className="mealplan-item-component">
        <Link to={`/meal-plan/${mealplan._id}`} className="float-right">
          <i className="fas fa-edit" />
        </Link>
        <button
          onClick={this.onDeleteMealplanClick.bind(this, mealplan._id)}
          className="btn btn-sm btn-danger"
        >
          Delete Mealplan
        </button>
        <h2>{mealplan.planname}</h2>
        {totalcaloriesInfo}
        {mealplansInfo}
      </div>
    );
  }
}

MealplanItem.propTypes = {
  deleteMealplan: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteMealplan }
)(withRouter(MealplanItem));
