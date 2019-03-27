import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createMealplan } from "../../actions/mealplanActions";

class CreateMealplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planname: "",
      user_id: ""
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
      planname: this.state.planname,
      user_id: this.props.auth.user.id
    };
    this.props.createMealplan(mealData, this.props.history);
    this.setState({ planname: "" });
  }
  render() {
    return (
      <div className="create-component text-center">
        <h1>Create a Mealplan</h1>
        <form onSubmit={this.onSubmit}>
          <select
            name="planname"
            value={this.state.planname}
            onChange={this.onChange}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button type="submit" className="m-2 btn btn-success">
            Create Mealplan
          </button>
        </form>
      </div>
    );
  }
}

CreateMealplan.propTypes = {
  createMealplan: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  mealplan: state.mealplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createMealplan }
)(withRouter(CreateMealplan));
