import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteMeal } from "../../actions/mealActions";

class DeleteMeal extends Component {
  onDeleteClick(id) {
    this.props.deleteMeal(id, this.props.history);
  }
  render() {
    const { meal } = this.props;
    return (
      <div>
        <button onClick={this.onDeleteClick.bind(this, meal._id)}>
          Delete Meal
        </button>
      </div>
    );
  }
}

DeleteMeal.propTypes = {
  deleteMeal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { deleteMeal }
)(withRouter(DeleteMeal));
