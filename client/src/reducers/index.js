import { combineReducers } from "redux";
import mealReducer from "./mealReducer";

export default combineReducers({
  meal: mealReducer
});
