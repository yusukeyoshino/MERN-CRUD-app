import { SET_MODAL } from "../actions/types";

export default function (
  state = { open: false, yesAction: "", noMessage: "", title: "" },
  action
) {
  switch (action.type) {
    case SET_MODAL:
      return action.payload;
    default:
      return state;
  }
}
