const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealSchema = new Schema({
  mealname: {
    type: String,
    required: true
  },
  totalcalories: {
    type: Number
  },
  ingredients: [
    {
      ingredient: {
        type: String,
        required: true
      },
      calories: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Meal = mongoose.model("meals", MealSchema);