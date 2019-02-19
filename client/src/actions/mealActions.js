import axios from "axios";
import {
  GET_MEALS,
  GET_MEAL_BY_ID,
  GET_MEALS_BY_USER,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//get meals
export const getMeals = () => dispatch => {
  axios
    .get("/api/meals")
    .then(res =>
      dispatch({
        type: GET_MEALS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEALS,
        payload: err.data
      })
    );
};

//get meals by user
export const getMealsByUser = user_id => dispatch => {
  axios
    .get(`/api/meals/usermeals/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_MEALS_BY_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEALS_BY_USER,
        payload: err.data
      })
    );
};

//create meal
export const createMeal = (mealData, history) => dispatch => {
  //post to api
  axios
    .post("/api/meals", mealData)
    .then(res => {
      dispatch(clearErrors());
      dispatch(getMealsByUser(mealData.user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add ingredients to meal
export const addIngredient = (meal_id, mealData) => dispatch => {
  axios
    .post(`/api/meals/${meal_id}/ingredient`, mealData)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: GET_MEAL_BY_ID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get meal by id
export const getMealById = meal_id => dispatch => {
  axios
    .get(`/api/meals/${meal_id}`)
    .then(res =>
      dispatch({
        type: GET_MEAL_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEAL_BY_ID,
        payload: err
      })
    );
};

//delete ingredient
export const deleteIngredient = (meal_id, ing_id) => dispatch => {
  axios
    .delete(`/api/meals/${meal_id}/ingredient/${ing_id}`)
    .then(res =>
      dispatch({
        type: GET_MEAL_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEAL_BY_ID,
        payload: "there was an error deleting the ingredient"
      })
    );
};

//delete meal
export const deleteMeal = (meal_id, user_id, history) => dispatch => {
  axios
    .delete(`/api/meals/${meal_id}`)
    .then(res => {
      dispatch(getMealsByUser(user_id));
    })
    .then(history.push("/meals"))
    .then(res =>
      dispatch({
        type: GET_MEALS_BY_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEALS_BY_USER,
        payload: err.data
      })
    );
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
