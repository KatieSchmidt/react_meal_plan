import axios from "axios";
import { GET_GROCERY_LIST, CREATE_GROCERY_LIST } from "./types";

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

//create grocery list from mealplan
export const getGroceryList = mealplan_id => dispatch => {
  axios
    .get(`/api/grocery-list/${mealplan_id}`)
    .then(res => dispatch(getGroceryList(mealplan_id)))
    .catch(err =>
      dispatch({
        type: GET_GROCERY_LIST,
        payload: `there was an error getting the grocery list`
      })
    );
};
