import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getWeekplansByUser } from "../../actions/weekplanActions";
import WeekplanItem from "./WeekplanItem";
import CreateWeekplan from "./CreateWeekplan";

class Weekplans extends Component {
  componentDidMount() {
    this.props.getWeekplansByUser(this.props.auth.user.id);
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
    const { weekplans } = this.props.weekplan;
    let weekplanItems;
    if (weekplans) {
      weekplanItems = weekplans
        .slice(0)
        .reverse()
        .map(weekplan => (
          <WeekplanItem key={weekplan._id} weekplan={weekplan} />
        ));
    } else {
      weekplanItems = <p>You havent created any weekly plans yet!</p>;
    }
    return (
      <div>
        <CreateWeekplan />
        <div>{weekplanItems}</div>
      </div>
    );
  }
}

Weekplans.propTypes = {
  getWeekplansByUser: PropTypes.func.isRequired,
  weekplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getWeekplansByUser: PropTypes.func.isrequired,
  weekplan: state.weekplan,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getWeekplansByUser }
)(withRouter(Weekplans));
