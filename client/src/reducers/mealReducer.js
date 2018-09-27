import { GET_MEALS, CREATE_MEAL, GET_MEAL_BY_ID } from "../actions/types";

const initialState = {
  meal: null,
  meals: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEAL_BY_ID:
      return {
        ...state,
        meal: action.payload
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload
      };
    case CREATE_MEAL:
      return {
        ...state,
        meal: action.payload
      };
    default:
      return state;
  }
}
