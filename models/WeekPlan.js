const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const WeekPlanSchema = new Schema({
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
  mealplans: [
    {
      type: Schema.Types.ObjectId,
      ref: "mealplans"
    }
  ]
});

module.exports = WeekPlan = mongoose.model("weekplans", WeekPlanSchema);
