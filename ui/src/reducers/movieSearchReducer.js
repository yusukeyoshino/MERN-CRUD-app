import { FETCH_MOVIES } from "../actions/types";

export default function (state = { results: null, total_results: 0 }, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload;
    default:
      return state;
  }
}
