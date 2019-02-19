import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getMealplansByUser } from "../../actions/mealplanActions";
import MealplanItem from "./MealplanItem";
import CreateMealplan from "../mealplan/CreateMealplan";

class Mealplans extends Component {
  componentDidMount() {
    this.props.getMealplansByUser(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push(`/`);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { mealplans } = this.props.mealplan;
    let mealplanItems;
    if (mealplans) {
      mealplanItems = mealplans
        .slice(0)
        .reverse()
        .map(mealplan => (
          <MealplanItem key={mealplan._id} mealplan={mealplan} />
        ));
    }
    return (
      <div>
        <CreateMealplan />
        <div>{mealplanItems}</div>
      </div>
    );
  }
}

Mealplans.propTypes = {
  getMealplansByUser: PropTypes.func.isRequired,
  mealplans: PropTypes.object
};

const mapStateToProps = state => ({
  mealplan: state.mealplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMealplansByUser }
)(withRouter(Mealplans));
