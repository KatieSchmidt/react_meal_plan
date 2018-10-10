const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const MealPlan = require("../../models/MealPlan");
const GroceryList = require("../../models/GroceryList");

//@route  POST api/grocery-list/:mealplan_id
//@dsc    create grocerylist from mealplan
//@access Public
router.post("/:mealplan_id", (req, res) => {
  //find mealplan
  MealPlan.findById(req.params.mealplan_id)
    .populate("meals")
    .then(mealplan => {
      const temp = [];
      mealplan.meals.map(meal => {
        meal.ingredients.map(ingredient => {
          temp.unshift({ ingredient: ingredient.ingredient, quantity: 1 });
        });
      });
      const list = new GroceryList({ groceries: temp });
      list.save().then(list => res.json(list));
    });
});

module.exports = router;
