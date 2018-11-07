import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createWeekplan } from "../../actions/weekplanActions";

class CreateWeekplan extends Component {
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
      planname: this.state.planname,
      user_id: this.props.auth.user.id
    };
    this.props.createWeekplan(mealData, this.props.history);
    this.setState({ planname: "" });
  }
  render() {
    return (
      <div className="create-mealplan-component text-center">
        <h1>Create a Weekplan</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="week"
            name="planname"
            value={this.state.planname}
            onChange={this.onChange}
          />
          <button type="submit" className="m-2 btn btn-success">
            Create Weekplan
          </button>
        </form>
      </div>
    );
  }
}

CreateWeekplan.propTypes = {
  createWeekplan: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  weekplan: state.weekplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createWeekplan }
)(withRouter(CreateWeekplan));
