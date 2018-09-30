import axios from "axios";
import {
  GET_MEALPLANS,
  GET_MEALPLAN_BY_ID,
  CREATE_MEALPLAN,
  ADD_MEAL_TO_MEALPLAN,
  DELETE_MEALPLAN,
  DELETE_MEAL_FROM_MEALPLAN
} from "./types";

//get mealplans
export const getMealPlans = () => dispatch => {
  axios
    .get("./api/meal-plan")
    .then(res =>
      dispatch({
        type: GET_MEALPLANS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEALPLANS,
        payload: err.data
      })
    );
};

// get mealplan by id
export const getMealPlanById = mealplan_id => dispatch => {
  axios
    .get(`/api/meal-plan/${mealplan_id}`)
    .then(res =>
      dispatch({
        type: GET_MEALPLAN_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEALPLAN_BY_ID,
        payload: err
      })
    );
};

//create mealplan
export const createMealPlan = (planname, history) => dispatch => {
  axios
    .post("./api/meal-plan", planname)
    .then(res =>
      dispatch({
        type: CREATE_MEALPLAN,
        payload: res.data
      })
    )
    .then(res => history.push("./meal-plan"));
};

//add meal to mealplan
export const addMeal = (mealplan_id, mealData) => dispatch => {
  axios.post(`/api/meal-plan/${mealplan_id}`, mealData).then(res =>
    dispatch({
      type: ADD_MEAL_TO_MEALPLAN,
      payload: res.data
    })
  );
};

//delete meal from mealplan
export const deleteMealFromMealplan = (mealplan_id, meal_id) => dispatch => {
  axios
    .delete(`/api/meals/${mealplan_id}/${meal_id}`)
    .then(res =>
      dispatch({
        type: DELETE_MEAL_FROM_MEALPLAN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_MEAL_FROM_MEALPLAN,
        payload: "there was an error deleting the meal from the mealplan"
      })
    );
};

//delete mealplan
export const deleteMealplan = (mealplan_id, history) => dispatch => {
  axios
    .delete(`/api/meals/${mealplan_id}`)
    .then(res =>
      dispatch({
        type: DELETE_MEALPLAN,
        payload: res.data
      })
    )
    .then(res => history.push("/mealplan"));
};
