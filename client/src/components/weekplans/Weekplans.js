import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWeekplans } from "../../actions/weekplanActions";
import WeekplanItem from "./WeekplanItem";
import CreateWeekplan from "./CreateWeekplan";

class Weekplans extends Component {
  componentDidMount() {
    this.props.getWeekplans();
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
      weekplanItems = <p>this isnt working correctly</p>;
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
  getWeekplans: PropTypes.func.isRequired,
  weekplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getWeekplans: PropTypes.func.isrequired,
  weekplan: state.weekplan
});

export default connect(
  mapStateToProps,
  { getWeekplans }
)(Weekplans);
