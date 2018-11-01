import axios from "axios";
import { GET_WEEKLY_GROCERY_LIST, CREATE_WEEKLY_GROCERY_LIST } from "./types";

//create weekly grocery list from mealplan
export const createWeeklyGroceryList = (weekplan_id, history) => dispatch => {
  axios
    .post(`/api/weekly-grocery-list/${weekplan_id}`)
    .then(res =>
      dispatch({
        type: CREATE_WEEKLY_GROCERY_LIST,
        payload: res.data
      })
    )
    .then(res => history.push(`/weekly-grocery-list/${weekplan_id}`));
};

//get weekly grocery list by if
export const getWeeklyGroceryList = weekplan_id => dispatch => {
  axios
    .get(`/api/weekly-grocery-list/${weekplan_id}`)
    .then(res =>
      dispatch({
        type: GET_WEEKLY_GROCERY_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY_GROCERY_LIST,
        payload: err
      })
    );
};

//delete item from weekly grocery list
export const deleteFromWeeklyGroceryList = (
  weekplan_id,
  ingredient_id
) => dispatch => {
  axios
    .delete(`/api/weekly-grocery-list/${weekplan_id}/${ingredient_id}`)
    .then(res =>
      dispatch({
        type: GET_WEEKLY_GROCERY_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY_GROCERY_LIST,
        payload: err
      })
    );
};
