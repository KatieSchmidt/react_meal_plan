const express = require("express");
const router = express.Router();
const Meal = require("../../models/Meal");
const WeekPlan = require("../../models/WeekPlan");
const WeeklyGroceryList = require("../../models/WeeklyGroceryList");

//@route  POST api/weekly-grocery-list/:week_plan_id
//@dsc    create weeklygrocerylist from week plan
//@access Public
router.post("/:week_plan_id", (req, res) => {
  WeekPlan.findById(req.params.week_plan_id)
    .populate({
      path: "mealplans",
      populate: {
        path: "meals",
        ref: "Meal"
      }
    })
    .then(weekplan => {
      const temp = [];
      for (mealplan of weekplan.mealplans) {
        mealplan.meals.map(meal => {
          meal.ingredients.map(ingredient => {
            temp.unshift({
              ingredient: ingredient.ingredient,
              quantity: Number(ingredient.measureunitquantity),
              measureunit: ingredient.measureunit
            });
          });
        });
      }
      console.log(temp);
      const ingArr = [];
      const objArr = [];
      for (obj of temp) {
        if (!ingArr.includes(obj.ingredient)) {
          ingArr.unshift(obj.ingredient);
          let tempObj = {
            ingredient: obj.ingredient,
            quantity: obj.quantity,
            measureunit: obj.measureunit
          };
          objArr.unshift(tempObj);
        } else {
          let objIndex = ingArr.indexOf(obj.ingredient);
          objArr[objIndex].quantity += obj.quantity;
        }
      }
      console.log(objArr);
      //check if list exists and update if so
      WeeklyGroceryList.findOne({
        associatedweekplanid: req.params.week_plan_id
      }).then(list => {
        if (list) {
          WeeklyGroceryList.findByIdAndDelete(list._id).then(() => {
            console.log("old list deleted");
            const newlist = new WeeklyGroceryList({
              associatedweekplanid: req.params.week_plan_id,
              groceries: objArr
            });
            newlist.save().then(list => res.json(list));
          });
        } else {
          const newlist = new WeeklyGroceryList({
            associatedweekplanid: req.params.week_plan_id,
            groceries: objArr
          });
          newlist.save().then(list => res.json(list));
        }
      });
    });
});

//@route  GET api/weekly-grocery-list
//@dsc    get all weekly grocery lists
//@access Public
router.get("/", (req, res) => {
  const errors = {};
  WeeklyGroceryList.find()
    .then(lists => {
      if (lists.length <= 0) {
        errors.lists = "No weekly grocery lists have been created";
        res.status(404).json(errors.lists);
      } else {
        return res.json(lists);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/weekly-grocery-list/:weekplan_id
//@dsc    get weekly grocery list by weekly grocery list id
//@access Public
router.get("/:weekplan_id", (req, res) => {
  const errors = {};
  WeeklyGroceryList.findOne({ associatedweekplanid: req.params.weekplan_id })
    .then(weeklygrocerylist => {
      if (!weeklygrocerylist) {
        errors.weeklygrocerylist = "this weekly grocery list doesnt exist";
        res.status(404).json(errors.weeklygrocerylist);
      } else {
        res.json(weeklygrocerylist);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@route  DELETE api/weekly-grocery-list/:weekly_grocery_list_id/:grocery_id
//@dsc    delete grocery item from grocery list
//@access Public
router.delete("/:weekplan_id/:grocery_id", (req, res) => {
  WeeklyGroceryList.findOne({
    associatedweekplanid: req.params.weekplan_id
  }).then(list => {
    let tempItemList = [];
    for (item of list.groceries) {
      tempItemList.push("" + item._id);
    }
    const removeIndex = tempItemList.indexOf("" + req.params.grocery_id);
    list.groceries.splice(removeIndex, 1);
    list.save().then(list => res.json(list));
  });
});

//@route  DELETE api/weekly-grocery-list/:weekly_grocerey_list_id
//@dsc    delete weekly grocery list by id
//@access Public
router.delete("/:weekly_grocery_list_id", (req, res) => {
  WeeklyGroceryList.findByIdAndRemove(req.params.weekly_grocery_list_id)
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
