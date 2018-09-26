const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const meals = require("./routes/api/meals");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch(err => console.log(err));

//use routes
app.use("/api/meals", meals);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});