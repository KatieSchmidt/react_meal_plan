const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const DaySchema = new Schema({
  breakfast: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
      }
    }
  ],
  lunch: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
      }
    }
  ],
  dinner: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
      }
    }
  ],
  snacks: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "meals"
      }
    }
  ]
});

module.exports = Day = mongoose.model("day", DaySchema);
