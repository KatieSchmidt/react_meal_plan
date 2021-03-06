import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  mealname: null,
  ingredient: null,
  calories: null,
  measureunit: null,
  measureunitquantity: null,
  grocery: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {
        mealname: null,
        ingredient: null
      };
    default:
      return state;
  }
}
