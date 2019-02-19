const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateIngredientInput(data) {
  let errors = {};
  data.ingredient = !isEmpty(data.ingredient) ? data.ingredient : "";
  data.calories = !isEmpty(data.calories) ? data.calories : "";
  data.measureunit = !isEmpty(data.measureunit) ? data.measureunit : "";
  data.measureunitquantity = !isEmpty(data.measureunitquantity)
    ? data.measureunitquantity
    : "";

  if (!Validator.isLength(data.ingredient, { min: 2, max: 30 })) {
    errors.ingredient = "Ingredient must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.ingredient)) {
    errors.ingredient = "Ingredient field is required";
  }

  if (Validator.isEmpty(data.calories)) {
    errors.calories = "Calories field is required";
  }

  if (Validator.isEmpty(data.measureunit)) {
    errors.measureunit = "Unit of measurement is required";
  }

  if (Validator.isEmpty(data.measureunitquantity)) {
    errors.measureunitquantity = "Quantity field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
