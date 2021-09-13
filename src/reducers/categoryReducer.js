import { FETCH_CATEGORY } from "../actions/types";

export default function(state = null, action) {
  // console.log("act", action);
  switch (action.type) {
    case FETCH_CATEGORY:
      //check without data
      return action.payload || false;
    default:
      return state;
  }
}
