import {
  GET_WEEKLY_GROCERY_LIST,
  CREATE_WEEKLY_GROCERY_LIST
} from "../actions/types";

const initialState = {
  weeklygrocerylist: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEEKLY_GROCERY_LIST:
      return {
        ...state,
        weeklygrocerylist: action.payload
      };
    case CREATE_WEEKLY_GROCERY_LIST:
      return {
        ...state,
        weeklygrocerylist: action.payload
      };
    default:
      return state;
  }
}
