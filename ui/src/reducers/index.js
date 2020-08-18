import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieSearchReducer from "./movieSearchReducer";
import userDiaryReducer from "./userDiaryReducer";
import formReducer from "./formReducer";
import spinnerReducer from "./spinnerReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  movies: movieSearchReducer,
  diaries: userDiaryReducer,
  form: formReducer,
  isSpining: spinnerReducer,
  modal: modalReducer,
});
