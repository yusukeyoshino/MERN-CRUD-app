import { FORM_REVIEW } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FORM_REVIEW:
      return action.payload;
    default:
      return state;
  }
}
