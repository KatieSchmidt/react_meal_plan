const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const MealPlan = require("../../models/MealPlan");
const GroceryList = require("../../models/GroceryList");

//GET ROUTES
//@route  GET api/meal-plan
//@dsc    retrieve plans
//@access Public
router.get("/", (req, res) => {
  MealPlan.find()
    .populate("meals")
    .then(plans => res.json(plans))
    .catch(err =>
      res.status(404).json({ noMealPlansFound: "No meal Plans found" })
    );
});

//@route  GET api/meal-plan/:plan_id
//@dsc    retrieve plan by id
//@access Public
router.get("/:plan_id", (req, res) => {
  MealPlan.findById(req.params.plan_id)
    .populate("meals")
    .then(mealplan => res.json(mealplan))
    .catch(err =>
      res
        .status(404)
        .json({ noMealPlanFound: "No meal plan found with that id" })
    );
});

//POST ROUTES
//@route  POST api/meal-plan
//@dsc    create mealplan
//@access Public
router.post("/", (req, res) => {
  const plan = new MealPlan({
    planname: req.body.planname
  });
  plan
    .save()
    .then(plan => res.json(plan))
    .catch(err => res.json({ saveError: "unable to save mealplan" }));
});

//@route  POST api/meal-plan/:plan_id
//@dsc    add meal to mealplan
//@access Public
router.post("/:mealplan_id/:meal_id", (req, res) => {
  MealPlan.findById(req.params.mealplan_id).then(mealplan => {
    Meal.findById(req.params.meal_id).then(meal => {
      mealplan.totalcalories += meal.totalcalories;
      mealplan.meals.unshift(meal._id);
      mealplan.save().then(mealplan => res.json(mealplan));
    });
  });
});

//DELETE ROUTES

//@route  DELETE api/meal-plan/:plan_id
//@dsc    delete plan by id
//@access Public
router.delete("/:plan_id", (req, res) => {
  MealPlan.findByIdAndRemove(req.params.plan_id)
    .then(() => {
      GroceryList.findOneAndRemove({
        associatedmealplanid: req.params.plan_id
      }).then(() => {
        res.json({ success: true });
      });
    })
    .catch(err =>
      res
        .status(404)
        .json({ noMealPlanFound: "No meal plan found with that id" })
    );
});

//@route  DELETE api/meal-plan/:plan_id/:meal_id
//@dsc    remove meal and calories from mealplan
//@access Public
router.delete("/:plan_id/:meal_id", (req, res) => {
  MealPlan.findById(req.params.plan_id).then(mealplan => {
    Meal.findById(req.params.meal_id)
      .then(meal => {
        mealplan.totalcalories -= meal.totalcalories;
        const removeIndex = mealplan.meals.indexOf(req.params.meal_id);
        mealplan.meals.splice(removeIndex, 1);
        mealplan
          .save()
          .populate("meals")
          .then(mealplan => res.json(mealplan));
      })
      .catch(err =>
        res.json({ error: "there was an error deleting this meal" })
      );
  });
});

module.exports = router;
