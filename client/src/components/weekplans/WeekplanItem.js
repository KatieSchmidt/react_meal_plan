import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { deleteWeekplan } from "../../actions/weekplanActions";

class WeekplanItem extends Component {
  onDeleteWeekplanClick(id, user_id) {
    this.props.deleteWeekplan(id, user_id, this.props.history);
  }
  render() {
    const { weekplan } = this.props;
    let weekplansInfo;
    let totalcaloriesInfo;

    if (weekplan.totalcalories) {
      totalcaloriesInfo = (
        <h4 className="total-calories"> {weekplan.totalcalories} Calories</h4>
      );
    } else {
      totalcaloriesInfo = (
        <h4 className="total-calories">No calories listed</h4>
      );
    }

    if (weekplan.mealplans) {
      weekplansInfo = (
        <h4 className="total-meals"> {weekplan.mealplans.length} Mealplans</h4>
      );
    } else {
      weekplansInfo = <h4 className="total-meals">No mealplans listed</h4>;
    }

    let buttonBox = (
      <div className="button-box">
        <Link to={`/week-plan/${weekplan._id}`}>
          <i className="fas fa-edit" />
        </Link>
        <div
          onClick={this.onDeleteWeekplanClick.bind(
            this,
            weekplan._id,
            weekplan.user
          )}
        >
          <i className="far fa-trash-alt delete-link" />
        </div>
      </div>
    );

    return (
      <div className="list-item">
        <h2>{weekplan.planname}</h2>
        {totalcaloriesInfo}
        {weekplansInfo}
        {buttonBox}
      </div>
    );
  }
}

WeekplanItem.propTypes = {
  deleteWeekplan: PropTypes.func.isRequired,
  weekplan: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteWeekplan }
)(withRouter(WeekplanItem));
