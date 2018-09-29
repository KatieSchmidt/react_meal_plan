const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealPlanSchema = new Schema({
  planname: {
    type: String,
    required: true
  },
  totalcalories: {
    type: Number,
    default: 0
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
