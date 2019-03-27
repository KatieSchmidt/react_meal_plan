const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const meals = require("./routes/api/meals");
const mealplan = require("./routes/api/meal-plan");
const groceries = require("./routes/api/grocery-list");
const weekplan = require("./routes/api/week-plan");
const weeklygrocerylist = require("./routes/api/weekly-grocery-list");
const users = require("./routes/api/users");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch(err => console.log(err));

//use routes
app.use("/api/meals", meals);
app.use("/api/meal-plan", mealplan);
app.use("/api/grocery-list", groceries);
app.use("/api/week-plan", weekplan);
app.use("/api/weekly-grocery-list", weeklygrocerylist);
app.use("/api/users", users);

const port = require("./config/keys").port;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
