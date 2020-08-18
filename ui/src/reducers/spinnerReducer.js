import { SET_SPINNER } from "../actions/types";

export default function (state = false, action) {
  switch (action.type) {
    case SET_SPINNER:
      return action.payload;
    default:
      return state;
  }
}
