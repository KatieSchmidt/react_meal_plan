import axios from "axios";
import { GET_MEALS, GET_MEAL_BY_ID, DELETE_MEAL } from "./types";

//get meals
export const getMeals = () => dispatch => {
  axios
    .get("./api/meals")
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

//create meal
export const createMeal = (mealName, history) => dispatch => {
  axios.post("./api/meals", mealName).then(res => history.push("./meals"));
};

//add ingredients to meal
export const addIngredient = (meal_id, mealData) => dispatch => {
  axios.post(`/api/meals/${meal_id}/ingredient`, mealData).then(res =>
    dispatch({
      type: GET_MEAL_BY_ID,
      payload: res.data
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
export const deleteMeal = (meal_id, history) => dispatch => {
  axios.delete(`/api/meals/${meal_id}`).then(res => history.push("/meals"));
};
