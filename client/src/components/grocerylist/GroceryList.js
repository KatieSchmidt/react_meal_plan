import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createGroceryList,
  getGroceryList
} from "../../actions/grocerylistActions";
import { withRouter } from "react-router-dom";

class GroceryList extends Component {
  componentDidMount() {
    if (this.props.match.params.mealplan_id) {
      this.props.createGroceryList(this.props.match.params.meal_id);
    }
  }
  getDerivedStateFromProps() {}

  render() {
    const { grocerylist } = this.props.grocerylist;
    let listItems;

    if (!grocerylist) {
      listItems = <p>No groceries found</p>;
    } else {
      listItems = grocerylist.groceries.map(groceryItem => {
        return (
          <li key={groceryItem._id + "groceryItem"}>
            {groceryItem.ingredient} : {groceryItem.quantity} Servings
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
  createGroceryList: PropTypes.func.isRequired,
  grocerylist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  grocerylist: state.grocerylist
});

export default connect(
  mapStateToProps,
  { createGroceryList, getGroceryList }
)(withRouter(GroceryList));
