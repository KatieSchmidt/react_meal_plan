import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getWeeklyGroceryList,
  deleteFromWeeklyGroceryList
} from "../../actions/weeklygrocerylistActions";
import { withRouter } from "react-router-dom";

class WeeklyGroceryList extends Component {
  componentDidMount() {
    if (this.props.match.params.week_plan_id) {
      return this.props.getWeeklyGroceryList(
        this.props.match.params.week_plan_id,
        this.props.history
      );
    }
  }
  onDeleteFromWeeklyGroceryListClick(ingredient_id) {
    this.props.deleteFromWeeklyGroceryList(
      this.props.match.params.week_plan_id,
      ingredient_id
    );
  }
  render() {
    const { weeklygrocerylist } = this.props.weeklygrocerylist;
    let listItems;

    if (!weeklygrocerylist) {
      listItems = <p>No groceries found</p>;
    } else {
      listItems = weeklygrocerylist.groceries.map(groceryItem => {
        return (
          <li key={groceryItem._id + "groceryItem"} className="list-unstyled">
            <button
              className="btn btn-sm btn-danger m-2"
              onClick={this.onDeleteFromWeeklyGroceryListClick.bind(
                this,
                groceryItem._id
              )}
            >
              <i className="fa fa-times" />
            </button>
            {groceryItem.ingredient} : {groceryItem.quantity}{" "}
            {groceryItem.measureunit} ('s)
          </li>
        );
      });
    }

    return (
      <div>
        <h1>Grocery List</h1>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

WeeklyGroceryList.propTypes = {
  deleteFromWeeklyGroceryList: PropTypes.func.isRequired,
  getWeeklyGroceryList: PropTypes.func.isRequired,
  weeklygrocerylist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weeklygrocerylist: state.weeklygrocerylist
});

export default connect(
  mapStateToProps,
  { getWeeklyGroceryList, deleteFromWeeklyGroceryList }
)(withRouter(WeeklyGroceryList));
