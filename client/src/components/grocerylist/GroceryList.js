import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroceryList } from "../../actions/grocerylistActions";

class GroceryList extends Component {
  componentWillReceiveProps() {}

  render() {
    const { grocerylist } = this.props.grocerylist;
    let listItems;

    if (!grocerylist) {
      listItems = <p>No groceries found</p>;
    } else {
      listItems = grocerylist.groceries.map(groceryItem => {
        return <li>{groceryItem.ingredient}</li>;
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
  getGroceryList: PropTypes.func.isRequired,
  grocerylist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  grocerylist: state.grocerylist
});

export default connect(
  mapStateToProps,
  { getGroceryList }
)(GroceryList);
