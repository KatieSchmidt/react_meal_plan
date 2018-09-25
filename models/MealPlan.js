const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealPlanSchema = new Schema({
  meals: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
      }
    }
  ]
});

module.exports = MealPlan = mongoose.model("mealplans", MealPlanSchema);
