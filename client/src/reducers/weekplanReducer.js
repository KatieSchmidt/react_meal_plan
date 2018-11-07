import {
  GET_WEEKPLANS,
  CREATE_WEEKPLAN,
  GET_WEEKPLAN_BY_ID,
  GET_WEEKPLANS_BY_USER,
  ADD_MEALPLAN_TO_WEEKPLAN
} from "../actions/types";

const initialState = {
  weekplans: null,
  weekplan: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEEKPLAN_BY_ID:
      return {
        ...state,
        weekplan: action.payload
      };
    case GET_WEEKPLANS:
      return {
        ...state,
        weekplans: action.payload
      };
    case GET_WEEKPLANS_BY_USER:
      return {
        ...state,
        weekplans: action.payload
      };
    case CREATE_WEEKPLAN:
      return {
        ...state,
        weekplan: action.payload
      };
    case ADD_MEALPLAN_TO_WEEKPLAN:
      return {
        ...state,
        weekplan: action.payload
      };
    default:
      return state;
  }
}
