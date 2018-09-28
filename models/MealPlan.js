const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealPlanSchema = new Schema({
  planname: {
    type: String,
    required: true
  },
  monday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  tuesday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  wednesday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  thursday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  friday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  saturday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  },
  sunday: {
    type: Schema.Types.ObjectId,
    ref: "day"
  }
});

module.exports = MealPlan = mongoose.model("mealplans", MealPlanSchema);
