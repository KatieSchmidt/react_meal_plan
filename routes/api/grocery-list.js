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
      //check if list exists and update if so
      GroceryList.findOne({
        associatedmealplanid: req.params.mealplan_id
      }).then(list => {
        if (list) {
          GroceryList.findByIdAndDelete(list._id).then(() => {
            console.log("old list deleted");
            const newlist = new GroceryList({
              associatedmealplanid: req.params.mealplan_id,
              groceries: temp
            });
            newlist.save().then(list => res.json(list));
          });
        } else {
          const newlist = new GroceryList({
            associatedmealplanid: req.params.mealplan_id,
            groceries: temp
          });
          newlist.save().then(list => res.json(list));
        }
      });
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

//@route  GET api/grocery-list/:mealplan_id
//@dsc    get grocery list by mealplan
//@access Public
router.get("/:mealplan_id", (req, res) => {
  GroceryList.findOne({ associatedmealplanid: req.params.mealplan_id }).then(
    list => {
      res.json(list);
    }
  );
});

//@route  DELETE api/grocery-list/:list_id
//@dsc    delete grocery list by id
//@access Public
router.delete("/:list_id", (req, res) => {
  GroceryList.findByIdAndRemove(req.params.list_id)
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
