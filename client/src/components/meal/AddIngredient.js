import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addIngredient } from "../../actions/mealActions";

import TextFieldGroup from "../../common/TextFieldGroup";

import classnames from "classnames";

class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      ingredient: "",
      calories: "",
      measureunit: "",
      measureunitquantity: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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
      calories: this.state.calories,
      measureunitquantity: this.state.measureunitquantity,
      measureunit: this.state.measureunit
    };
    this.props.addIngredient(meal_id, ingredientData, this.props.history);
    this.setState({
      ingredient: "",
      calories: "",
      measureunit: "",
      measureunitquantity: ""
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="text-center add-ingredient-component">
        <h3>Add Ingredients</h3>
        <form onSubmit={this.onSubmit} noValidate>
          <TextFieldGroup
            placeholder="Ingredient"
            name="ingredient"
            type="string"
            value={this.state.ingredient}
            onChange={this.onChange}
            error={errors.ingredient}
          />
          <TextFieldGroup
            placeholder="Calories"
            name="calories"
            type="string"
            value={this.state.calories}
            onChange={this.onChange}
            error={errors.calories}
          />
          <TextFieldGroup
            placeholder="Quantity"
            name="measureunitquantity"
            type="string"
            value={this.state.measureunitquantity}
            onChange={this.onChange}
            error={errors.measureunitquantity}
          />
          <select
            name="measureunit"
            value={this.state.measureunit}
            onChange={this.onChange}
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.measureunit
            })}
            noValidate
          >
            <option>Select Unit</option>
            <option>Cup</option>
            <option>Tbsp</option>
            <option>Tsp</option>
            <option>Ounce</option>
            <option>Handful</option>
            <option>Pint</option>
            <option>Quart</option>
            <option>Portion</option>
          </select>
          {errors.measureunit && (
            <div className="invalid-feedback">{errors.measureunit}</div>
          )}
          <br />
          <button type="submit" className="m-2 btn btn-success">
            Add Ingredient
          </button>
        </form>
      </div>
    );
  }
}

AddIngredient.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addIngredient }
)(withRouter(AddIngredient));
