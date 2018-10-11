import { GET_GROCERY_LIST, CREATE_GROCERY_LIST } from "../actions/types";

const initialState = {
  grocerylist: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GROCERY_LIST:
      return {
        ...state,
        grocerylist: action.payload
      };
    case CREATE_GROCERY_LIST:
      return {
        ...state,
        grocerylist: action.payload
      };

    default:
      return state;
  }
}
