import { CONFIRM_FORM, SUBMIT_FORM } from "../actions/types";

export default function (state = null, action) {
  // console.log("act", action);
  switch (action.type) {
    case CONFIRM_FORM:
      //check without data
      return action.payload;
    case SUBMIT_FORM:
      return null;
    default:
      return state;
  }
}
