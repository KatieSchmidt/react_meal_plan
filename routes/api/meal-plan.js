const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const MealPlan = require("../../models/MealPlan");

//GET ROUTES
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

//@route  GET api/meal-plan/:plan_id
//@dsc    retrieve plan by id
//@access Public
router.get("/:plan_id", (req, res) => {
  MealPlan.findById(req.params.plan_id)
    .then(plan => res.json(plan))
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
router.post("/:plan_id", (req, res) => {
  MealPlan.findById(req.params.plan_id).then(mealplan => {
    Meal.findById(req.body.mealid).then(meal => {
      mealplan.totalcalories += meal.totalcalories;
      mealplan.meals.unshift(meal);
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
      res.json({ success: true });
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
        const removeIndex = mealplan.meals
          .map(meal => meal.id)
          .indexOf(req.params.meal_id);
        if (removeIndex === -1) {
          return res.json({ message: "there is no more of that meal" });
        }
        mealplan.meals.splice(removeIndex, 1);
        mealplan.save().then(mealplan => res.json(mealplan));
      })
      .catch(err =>
        res.json({ error: "there was an error deleting this meal" })
      );
  });
});

module.exports = router;
