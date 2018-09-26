import axios from "axios";
import { GET_MEALS } from "./types";

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
