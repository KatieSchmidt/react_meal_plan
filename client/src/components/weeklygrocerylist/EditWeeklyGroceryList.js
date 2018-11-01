import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getWeeklyGroceryList,
  deleteFromWeeklyGroceryList
} from "../../actions/weeklygrocerylistActions";
import { withRouter } from "react-router-dom";

class EditWeeklyGroceryList extends Component {
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
    console.log("Button Clicked to delete");
  }
  render() {
    const { weeklygrocerylist } = this.props.weeklygrocerylist;
    let listItems;

    if (!weeklygrocerylist) {
      listItems = <p>No groceries found</p>;
    } else {
      listItems = weeklygrocerylist.groceries.map(groceryItem => {
        return (
          <li key={groceryItem._id + "groceryItem"}>
            {groceryItem.ingredient} : {groceryItem.quantity} Servings{" "}
            <button
              onClick={this.onDeleteFromWeeklyGroceryListClick.bind(
                this,
                groceryItem._id
              )}
            >
              X
            </button>
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

EditWeeklyGroceryList.propTypes = {
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
)(withRouter(EditWeeklyGroceryList));
