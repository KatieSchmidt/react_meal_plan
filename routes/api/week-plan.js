const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const MealPlan = require("../../models/MealPlan");
const GroceryList = require("../../models/GroceryList");
const WeekPlan = require("../../models/WeekPlan");

//@route GET api/week-plan
//@dsc    get all weekly plans
//@access Public
router.get("/", (req, res) => {
  WeekPlan.find()
    .populate({
      path: "mealplans",
      populate: {
        path: "meals",
        ref: "Meal"
      }
    })
    .then(weekplans => res.json(weekplans))
    .catch(err => res.status(404).json(err));
});

//@route GET api/week-plan/:week_plan_id
//@dsc    get week plan by plan id
//@access Public
router.get("/:week_plan_id", (req, res) => {
  WeekPlan.findById(req.params.week_plan_id)
    .populate({
      path: "mealplans",
      populate: {
        path: "meals",
        ref: "Meal"
      }
    })
    .then(week_plan => res.json(week_plan))
    .catch(err => res.status(404).json(err));
});

//@route GET api/week-plan/userweekplans/:user_id
//@dsc    get week plans by user id
//@access Public
router.get("/userweekplans/:user_id", (req, res) => {
  WeekPlan.find({ user: req.params.user_id })
    .populate({
      path: "mealplans",
      populate: {
        path: "meals",
        ref: "Meal"
      }
    })
    .then(week_plans => res.json(week_plans))
    .catch(err => res.status(404).json(err));
});

//@route POST api/week-plan
//@dsc    create a weekplan
//@access Public
router.post("/", (req, res) => {
  const plan = new WeekPlan({
    planname: req.body.planname,
    user: req.body.user_id
  });
  plan
    .save()
    .then(plan => res.json(plan))
    .catch(err => res.json({ saveError: "unable to save mealplan" }));
});

//@route POST api/week-plan/:week_plan_id/:mealplan_id
//@dsc    add a mealplan to a weekplan and add calories
//@access Public
router.post("/:week_plan_id/:mealplan_id", (req, res) => {
  WeekPlan.findById(req.params.week_plan_id).then(weekplan => {
    MealPlan.findById(req.params.mealplan_id).then(mealplan => {
      weekplan.totalcalories += mealplan.totalcalories;
      weekplan.mealplans.unshift(mealplan._id);
      weekplan.save().then(weekplan => res.json(weekplan));
    });
  });
});

//@route DELETE api/week-plan/:week_plan_id/:mealplan_id
//@dsc    remove a mealplan from a weekplan and remove calories
//@access Public
router.delete("/:week_plan_id/:mealplan_id", (req, res) => {
  WeekPlan.findById(req.params.week_plan_id).then(weekplan => {
    MealPlan.findById(req.params.mealplan_id).then(mealplan => {
      let removeIndex = weekplan.mealplans.indexOf("" + mealplan._id);
      if (removeIndex === -1) {
        return res.json({
          error: "You cant remove something thats already gone."
        });
      } else {
        weekplan.totalcalories -= mealplan.totalcalories;
        weekplan.mealplans.splice(removeIndex, 1);
        weekplan.save().then(weekplan => res.json(weekplan));
      }
    });
  });
});

//@route  DELETE api/week-plan/:week_plan_id
//@dsc    delete weekplan by id
//@access Public
router.delete("/:week_plan_id", (req, res) => {
  WeekPlan.findByIdAndRemove(req.params.week_plan_id)
    .then(() => {
      res.json({ success: true });
    })
    .catch(err =>
      res
        .status(404)
        .json({ noWeekPlanFound: "No week plan found with that id" })
    );
});

module.exports = router;
