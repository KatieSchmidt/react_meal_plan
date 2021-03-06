const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");

const validateMealInput = require("../../validation/meal");
const validateIngredientInput = require("../../validation/ingredient");

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

//@route  GET api/meals/usermeals/:user_id
//@dsc    get meals by user_id
//@access Public
router.get("/usermeals/:user_id", (req, res) => {
  const errors = {};
  Meal.find({ user: req.params.user_id })
    .then(meals => {
      if (!meals) {
        errors.meals = "this user doesnt have any meals";
        res.status(404).json(errors.meals);
      } else {
        res.json(meals);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  Post api/meals
//@dsc    create a meal
//@access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateMealInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const mealFields = {
    mealname: req.body.mealname,
    user: req.body.user
  };

  Meal.findOne({ mealname: mealFields.mealname, user: mealFields.user })
    .then(meal => {
      if (meal) {
        errors.mealname = "this meal already exists";
        res.status(400).json(errors);
      } else {
        new Meal(mealFields).save().then(meal => {
          res.json(meal);
        });
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  Post api/meals/:meal_id/ingredients
//@dsc    add meals ingredients and calories per ingredient
//@access Public
router.post("/:meal_id/ingredient", (req, res) => {
  const { errors, isValid } = validateIngredientInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ingredient = {};
  ingredient.ingredient = req.body.ingredient;
  ingredient.calories = req.body.calories;
  ingredient.measureunit = req.body.measureunit;
  ingredient.measureunitquantity = req.body.measureunitquantity;

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

//@route  DELETE api/meals/:meal_id
//@dsc    delete a meal
//@access Public
router.delete("/:meal_id", (req, res) => {
  Meal.findByIdAndDelete(req.params.meal_id).then(meal => {
    res.json({ success: true });
  });
});

//@route  DELETE api/meals/:meal_id/ingredient/:ing_id
//@dsc    remove ingredient
//@access Public
router.delete("/:meal_id/ingredient/:ing_id", (req, res) => {
  Meal.findById(req.params.meal_id)
    .then(meal => {
      const removeIndex = meal.ingredients
        .map(ingredient => ingredient.id)
        .indexOf(req.params.ing_id);

      let calsToRemove = meal.ingredients[removeIndex].calories;
      meal.totalcalories -= calsToRemove;
      meal.ingredients.splice(removeIndex, 1);
      meal.save().then(meal => res.json(meal));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
