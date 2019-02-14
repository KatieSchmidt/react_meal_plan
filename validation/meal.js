const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMealInput(data) {
  let errors = {};
  data.mealname = !isEmpty(data.mealname) ? data.mealname : "";

  if (Validator.isEmpty(data.mealname)) {
    errors.mealname = "Mealname field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
