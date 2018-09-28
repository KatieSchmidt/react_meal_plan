const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const MealPlan = require("../../models/MealPlan");
const Day = require("../../models/Day");

//@route  GET api/meal-plan
//@dsc    retrieve plans
//@access Public
router.get("/", (req, res) => {
  MealPlan.find()
    .then(plans => res.json(plans))
    .catch(err =>
      res.status(404).json({ noMealPlansFound: "No meal Plans found" })
    );
});

//@route  POST api/meal-plan
//@dsc    create mealplan
//@access Public
router.post("/", (req, res) => {
  const newPlan = new MealPlan({
    planname: req.body.planname
  });
  newPlan.save().then(plan => res.json(plan));
});

module.exports = router;
