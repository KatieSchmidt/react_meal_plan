import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getMealsByUser } from "../../actions/mealActions";
import MealItem from "./MealItem";
import CreateMeal from "../meal/CreateMeal";

class Meals extends Component {
  componentDidMount() {
    this.props.getMealsByUser(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push(`/login`);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { meals } = this.props.meal;
    let mealItems;

    if (meals) {
      mealItems = meals
        .slice(0)
        .reverse()
        .map(meal => <MealItem meal={meal} key={meal._id + "mealItem"} />);
    }
    return (
      <div className="meals">
        <CreateMeal />
        <div className="meals-list">{mealItems}</div>
      </div>
    );
  }
}

Meals.propTypes = {
  getMealsByUser: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMealsByUser }
)(withRouter(Meals));
