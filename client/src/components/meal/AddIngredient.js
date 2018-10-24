import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addIngredient } from "../../actions/mealActions";

class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      calories: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps() {}

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const meal_id = this.props.meal.meal._id;
    const ingredientData = {
      ingredient: this.state.ingredient,
      calories: this.state.calories
    };
    this.props.addIngredient(meal_id, ingredientData, this.props.history);
    this.setState({ ingredient: "", calories: 0 });
  }
  render() {
    return (
      <div>
        <h3>Add Ingredients</h3>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Ingredient"
            name="ingredient"
            value={this.state.ingredient}
            onChange={this.onChange}
          />
          <input
            placeholder="Calories"
            name="calories"
            value={this.state.calories}
            onChange={this.onChange}
          />
          <button type="submit">Add Ingredient</button>
        </form>
      </div>
    );
  }
}

AddIngredient.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal
});

export default connect(
  mapStateToProps,
  { addIngredient }
)(withRouter(AddIngredient));
