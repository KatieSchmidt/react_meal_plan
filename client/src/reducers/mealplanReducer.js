import {
  GET_MEALPLANS,
  CREATE_MEALPLAN,
  GET_MEALPLAN_BY_ID,
  ADD_MEAL_TO_MEALPLAN,
  DELETE_MEAL_FROM_MEALPLAN,
  DELETE_MEALPLAN
} from "../actions/types";

const initialState = {
  meal: null,
  meals: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEALPLAN_BY_ID:
      return {
        ...state,
        mealplan: action.payload
      };
    case GET_MEALPLANS:
      return {
        ...state,
        mealplans: action.payload
      };
    case CREATE_MEALPLAN:
      return {
        ...state,
        mealplan: action.payload
      };
    case DELETE_MEALPLAN:
      return {
        ...state,
        mealplan: action.payload
      };
    case ADD_MEAL_TO_MEALPLAN:
      return {
        ...state,
        mealplan: action.payload
      };
    case DELETE_MEAL_FROM_MEALPLAN:
      return {
        ...state,
        mealplans: action.payload
      };
    default:
      return state;
  }
}
