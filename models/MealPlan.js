const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealPlanSchema = new Schema({
  planname: {
    type: String,
    required: true
  },
  meals: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meal"
      }
    }
  ]
});

module.exports = MealPlan = mongoose.model("mealplans", MealPlanSchema);
