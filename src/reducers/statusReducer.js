import { PROCESS_STATUS } from "../actions/types";

export default function(state = null, action) {
  // console.log("act", action);
  switch (action.type) {
    case PROCESS_STATUS:
      //check without data
      return action.payload || false;
    default:
      return state;
  }
}
