const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");

//@route  GET api/meals
//@dsc    get all meals
//@access Public
router.get("/", (req, res) => {
  const errors = {};
  Meal.find()
    .then(meals => {
      if (meals.length <= 0) {
        errors.meal = "No meals have been created";
        res.status(404).json(errors.meal);
      } else {
        return res.json(meals);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/meals/:meal_id
//@dsc    get a meal
//@access Public
router.get("/:meal_id", (req, res) => {
  const errors = {};
  Meal.findById(req.params.meal_id)
    .then(meal => {
      if (!meal) {
        errors.meal = "this meal doesnt exist";
        res.status(404).json(errors.meal);
      } else {
        res.json(meal);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  Post api/meals
//@dsc    create a meal
//@access Public
router.post("/", (req, res) => {
  const errors = {};
  const mealFields = {};
  mealFields.mealname = req.body.mealname;
  Meal.findOne({ mealname: mealFields.mealname })
    .then(meal => {
      if (meal) {
        errors.meal = "this meal already exists";
        res.status(400).json(errors.meal);
      } else {
        new Meal(mealFields).save().then(meal => res.json(meal));
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  Post api/meals/:meal_id/ingredients
//@dsc    add meals ingredients and calories per ingredient
//@access Public
router.post("/:meal_id/ingredient", (req, res) => {
  const errors = {};
  const ingredient = {};
  ingredient.ingredient = req.body.ingredient;
  ingredient.calories = req.body.calories;

  Meal.findById(req.params.meal_id)
    .then(meal => {
      if (!meal) {
        errors.meal = "this meal doesnt exist";
        res.status(400).json(errors.meal);
      } else {
        meal.ingredients.unshift(ingredient);
        let mealCals = 0;
        meal.ingredients.map(ingredient => {
          mealCals += ingredient.calories;
        });
        meal.totalcalories = mealCals;
        meal.save().then(meal => res.json(meal));
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  DELETE api/meals/:meal_id/ingredient/:ing_id
//@dsc    remove ingredient
//@access Public
router.delete("/:meal_id/ingredient/:ing_id", (req, res) => {
  Meal.findById(req.params.meal_id)
    .then(meal => {
      console.log(meal);
      const removeIndex = meal.ingredients
        .map(ingredient => ingredient.id)
        .indexOf(req.params.ing_id);
      console.log(removeIndex);
      meal.ingredients.splice(removeIndex, 1);
      meal.save().then(meal => res.json(meal));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
