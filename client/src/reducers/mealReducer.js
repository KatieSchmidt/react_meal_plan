import { GET_MEALS } from "../actions/types";

const initialState = {
  meals: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload
      };
    default:
      return state;
  }
}
