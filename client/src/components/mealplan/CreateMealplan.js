import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createMealplan } from "../../actions/mealplanActions";

class CreateMealplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planname: ""
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
      planname: this.state.planname
    };
    this.props.createMealplan(mealData, this.props.history);
  }
  render() {
    return (
      <div>
        <h1>Create a Mealplan</h1>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder=" * Mealplan Name"
            name="planname"
            value={this.state.planname}
            onChange={this.onChange}
            info="name your mealplan a day is a good idea. like monday"
          />
          <button type="submit">Create Mealplan</button>
        </form>
      </div>
    );
  }
}

CreateMealplan.propTypes = {
  createMealplan: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  mealplan: state.meal
});

export default connect(
  mapStateToProps,
  { createMealplan }
)(withRouter(CreateMealplan));
