import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import mealplanReducer from "./mealplanReducer";
import grocerylistReducer from "./grocerylistReducer";
import weekplanReducer from "./weekplanReducer";
import weeklygrocerylistReducer from "./weeklygrocerylistReducer";

export default combineReducers({
  meal: mealReducer,
  mealplan: mealplanReducer,
  grocerylist: grocerylistReducer,
  weekplan: weekplanReducer,
  weeklygrocerylist: weeklygrocerylistReducer
});
