import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getGroceryList,
  deleteFromGroceryList
} from "../../actions/grocerylistActions";
import { withRouter } from "react-router-dom";

class GroceryList extends Component {
  componentDidMount() {
    if (this.props.match.params.mealplan_id) {
      return this.props.getGroceryList(
        this.props.match.params.mealplan_id,
        this.props.history
      );
    }
  }
  onDeleteFromGroceryListClick(ingredient_id) {
    this.props.deleteFromGroceryList(
      this.props.match.params.mealplan_id,
      ingredient_id
    );
    console.log("Button Clicked to delete");
  }
  render() {
    const { grocerylist } = this.props.grocerylist;
    let listItems;

    if (!grocerylist) {
      listItems = <p>No groceries found</p>;
    } else {
      listItems = grocerylist.groceries.map(groceryItem => {
        return (
          <li key={groceryItem._id + "groceryItem"} className="list-unstyled">
            <button
              className="btn btn-sm btn-danger m-2"
              onClick={this.onDeleteFromGroceryListClick.bind(
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

GroceryList.propTypes = {
  deleteFromGroceryList: PropTypes.func.isRequired,
  getGroceryList: PropTypes.func.isRequired,
  grocerylist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  grocerylist: state.grocerylist
});

export default connect(
  mapStateToProps,
  { getGroceryList, deleteFromGroceryList }
)(withRouter(GroceryList));
