const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealPlanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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
      type: Schema.Types.ObjectId,
      ref: "meals"
    }
  ]
});

module.exports = MealPlan = mongoose.model("mealplans", MealPlanSchema);
