const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const GroceryListSchema = new Schema({
  associatedmealplanid: {
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

module.exports = GroceryList = mongoose.model(
  "grocerylists",
  GroceryListSchema
);
