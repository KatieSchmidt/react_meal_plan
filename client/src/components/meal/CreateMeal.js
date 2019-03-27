import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createMeal } from "../../actions/mealActions";
import TextFieldGroup from "../../common/TextFieldGroup";

class CreateMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealname: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const mealData = {
      mealname: this.state.mealname,
      user: this.props.auth.user.id
    };
    this.props.createMeal(mealData, this.props.history);
    this.setState({
      mealname: ""
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="text-center  create-component">
        <h1>Create a Meal</h1>
        <form onSubmit={this.onSubmit} noValidate>
          <TextFieldGroup
            placeholder="Meal Name"
            name="mealname"
            type="string"
            value={this.state.mealname}
            onChange={this.onChange}
            error={errors.mealname}
          />
          <input type="submit" className="btn btn-info btn-block" />
        </form>
      </div>
    );
  }
}

CreateMeal.propTypes = {
  createMeal: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createMeal }
)(withRouter(CreateMeal));
