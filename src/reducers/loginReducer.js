import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
//   console.log("act reducer", action);
  switch (action.type) {
    case FETCH_USER:
      //check without data
      return action.payload;
    default:
      return state;
  }
}
