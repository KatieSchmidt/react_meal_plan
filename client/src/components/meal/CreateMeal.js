import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createMeal } from "../../actions/mealActions";

class CreateMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealname: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const mealData = {
      mealname: this.state.mealname
    };
    this.props.createMeal(mealData, this.props.history);
  }
  render() {
    return (
      <div className="text-center create-meal-component">
        <h1>Create a Meal</h1>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Meal Name"
            name="mealname"
            value={this.state.mealname}
            onChange={this.onChange}
            info="name your meal, you can add ingredients and calories later"
          />
          <button type="submit">Create Meal</button>
        </form>
      </div>
    );
  }
}

CreateMeal.propTypes = {
  createMeal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { createMeal }
)(withRouter(CreateMeal));
