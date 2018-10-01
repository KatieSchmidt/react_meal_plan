import {
  GET_MEALPLANS,
  CREATE_MEALPLAN,
  GET_MEALPLAN_BY_ID,
  ADD_MEAL_TO_MEALPLAN
} from "../actions/types";

const initialState = {
  mealplans: null,
  mealplan: null
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
    case ADD_MEAL_TO_MEALPLAN:
      return {
        ...state,
        mealplan: action.payload
      };
    default:
      return state;
  }
}
