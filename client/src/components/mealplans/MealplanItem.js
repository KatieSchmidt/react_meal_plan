import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { deleteMealplan } from "../../actions/mealplanActions";

class MealplanItem extends Component {
  onDeleteMealplanClick(id, user_id) {
    this.props.deleteMealplan(id, user_id, this.props.history);
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

    let buttonBox = (
      <div className="button-box">
        <Link to={`/meal-plan/${mealplan._id}`} className="float-right">
          <i className="fas fa-edit" />
        </Link>
        <div
          onClick={this.onDeleteMealplanClick.bind(
            this,
            mealplan._id,
            mealplan.user
          )}
        >
          <i className="far fa-trash-alt delete-link" />
        </div>
      </div>
    );

    return (
      <div className="list-item">
        <h2>{mealplan.planname}</h2>
        {totalcaloriesInfo}
        {mealplansInfo}
        {buttonBox}
      </div>
    );
  }
}

MealplanItem.propTypes = {
  deleteMealplan: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMealplan }
)(withRouter(MealplanItem));
