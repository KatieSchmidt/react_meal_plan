import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import mealplanReducer from "./mealplanReducer";
import grocerylistReducer from "./grocerylistReducer";
import weekplanReducer from "./weekplanReducer";
import weeklygrocerylistReducer from "./weeklygrocerylistReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  meal: mealReducer,
  mealplan: mealplanReducer,
  grocerylist: grocerylistReducer,
  weekplan: weekplanReducer,
  weeklygrocerylist: weeklygrocerylistReducer,
  auth: authReducer,
  errors: errorReducer
});
