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

//@route  GET api/grocery-list
//@dsc    get grocery lists
//@access Public
router.get("/", (req, res) => {
  GroceryList.find().then(lists => {
    res.json(lists);
  });
});

//@route  GET api/grocery-list/:list_id
//@dsc    get grocery lists
//@access Public
router.get("/:list_id", (req, res) => {
  GroceryList.findById(req.params.list_id).then(list => {
    res.json(list);
  });
});

//@route  DELETE api/grocery-list/:list_id
//@dsc    get grocery lists
//@access Public
router.delete("/:list_id", (req, res) => {
  MealPlan.findByIdAndRemove(req.params.list_id)
    .then(() => {
      res.json({ success: true });
    })
    .catch(err =>
      res
        .status(404)
        .json({ noListFound: "No grocery list found with that id" })
    );
});

module.exports = router;
