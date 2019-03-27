const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const meals = require("./routes/api/meals");
const mealplan = require("./routes/api/meal-plan");
const groceries = require("./routes/api/grocery-list");
const weekplan = require("./routes/api/week-plan");
const weeklygrocerylist = require("./routes/api/weekly-grocery-list");
const users = require("./routes/api/users");

require("dotenv").config();

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

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
