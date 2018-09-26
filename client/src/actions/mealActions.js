import axios from "axios";
import { GET_MEALS, CREATE_MEAL } from "./types";

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
