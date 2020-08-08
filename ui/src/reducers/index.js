import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieSearchReducer from "./movieSearchReducer";
import userDiaryReducer from "./userDiaryReducer";

export default combineReducers({
  auth: authReducer,
  movies: movieSearchReducer,
  diaries: userDiaryReducer,
});
