import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMealplans } from "../../actions/mealplanActions";
import MealplanItem from "./MealplanItem";

class Mealplans extends Component {
  componentDidMount() {
    this.props.getMealplans();
  }
  componentWillReceiveProps() {}
  render() {
    const { mealplans } = this.props.mealplan;
    let mealplanItems;
    if (mealplans) {
      mealplanItems = mealplans.map(mealplan => (
        <MealplanItem key={mealplan._id} mealplan={mealplan} />
      ));
    }
    return (
      <div>
        <div>{mealplanItems}</div>
      </div>
    );
  }
}

Mealplans.propTypes = {
  getMealplans: PropTypes.func.isRequired,
  mealplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getMealplans: PropTypes.func.isrequired,
  mealplan: state.mealplan
});

export default connect(
  mapStateToProps,
  { getMealplans }
)(Mealplans);
