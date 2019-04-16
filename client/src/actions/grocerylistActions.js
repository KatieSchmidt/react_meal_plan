import axios from "axios";
import { GET_GROCERY_LIST, CREATE_GROCERY_LIST, GET_ERRORS } from "./types";

//create grocery list from mealplan
export const createGroceryList = (mealplan_id, history) => dispatch => {
  axios
    .post(`/api/grocery-list/${mealplan_id}`)
    .then(res =>
      dispatch({
        type: CREATE_GROCERY_LIST,
        payload: res.data
      })
    )
    .then(res => history.push(`/grocery-list/${mealplan_id}`));
};

//get grocery list from mealplan
export const getGroceryList = mealplan_id => dispatch => {
  axios
    .get(`/api/grocery-list/${mealplan_id}`)
    .then(res =>
      dispatch({
        type: GET_GROCERY_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete item from grocery list
export const deleteFromGroceryList = (
  mealplan_id,
  ingredient_id
) => dispatch => {
  axios
    .delete(`/api/grocery-list/${mealplan_id}/${ingredient_id}`)
    .then(res =>
      dispatch({
        type: GET_GROCERY_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
