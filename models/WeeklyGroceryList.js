const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const WeeklyGroceryListSchema = new Schema({
  associatedweekplanid: {
    type: String
  },
  groceries: [
    {
      ingredient: {
        type: String
      },
      quantity: {
        type: Number
      },
      measureunit: {
        type: String
      }
    }
  ]
});

module.exports = WeeklyGroceryList = mongoose.model(
  "weeklygrocerylists",
  WeeklyGroceryListSchema
);
