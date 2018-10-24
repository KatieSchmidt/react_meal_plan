import axios from "axios";
import {
  GET_MEALPLANS,
  GET_MEALPLAN_BY_ID,
  ADD_MEAL_TO_MEALPLAN
} from "./types";

//get mealplans
export const getMealplans = () => dispatch => {
  axios
    .get("/api/meal-plan")
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
export const getMealplanById = mealplan_id => dispatch => {
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
        payload: null
      })
    );
};

//create mealplan
export const createMealplan = (planname, history) => dispatch => {
  axios.post("/api/meal-plan", planname).then(res => dispatch(getMealplans()));
};

//add meal to mealplan
export const addMealToMealplan = (mealplan_id, meal_id) => dispatch => {
  axios
    .post(`/api/meal-plan/${mealplan_id}/${meal_id}`)
    .then(res => dispatch(getMealplanById(mealplan_id)))
    .catch(err =>
      dispatch({
        type: ADD_MEAL_TO_MEALPLAN,
        payload: `there was an error adding the meal: ${err}`
      })
    );
};

//delete meal from mealplan
export const deleteMealFromMealplan = (
  mealplan_id,
  meal_id,
  history
) => dispatch => {
  axios
    .delete(`/api/meal-plan/${mealplan_id}/${meal_id}`)
    .then(res => dispatch(getMealplanById(mealplan_id)))
    .then(res => history.push(`./${mealplan_id}`))
    .catch(err =>
      dispatch({
        type: GET_MEALPLAN_BY_ID,
        payload: "there was an error deleting the meal"
      })
    );
};

//delete mealplan
export const deleteMealplan = (mealplan_id, history) => dispatch => {
  axios
    .delete(`/api/meal-plan/${mealplan_id}`)
    .then(res => {
      dispatch(getMealplans());
    })
    .then(history.push("/meal-plan"))
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
