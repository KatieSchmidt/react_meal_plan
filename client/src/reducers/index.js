import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import mealplanReducer from "./mealplanReducer";

export default combineReducers({
  meal: mealReducer,
  mealplan: mealplanReducer
});
