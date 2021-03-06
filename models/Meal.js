const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MealSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  mealname: {
    type: String,
    required: true
  },
  totalcalories: {
    type: Number,
    default: 0
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
      },
      measureunitquantity: {
        type: Number,
        required: true
      },
      measureunit: {
        type: String,
        required: true
      }
    }
  ],
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  inplans: [
    {
      type: String
    }
  ]
});

module.exports = Meal = mongoose.model("meals", MealSchema);
