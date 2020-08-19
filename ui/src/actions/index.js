import axios from "axios";
import {
  FETCH_USER,
  FETCH_MOVIES,
  FETCH_DIARIES,
  FORM_REVIEW,
  SET_SPINNER,
  SET_MODAL,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchMovies = (term, pageNumber) => async (dispatch) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_IMDB_KEY}&language=en-US&query=${term}&include_adult=false&page=${pageNumber}`
  );
  console.log(res);
  const { results, total_pages, page, total_results } = res.data;
  dispatch({
    type: FETCH_MOVIES,
    payload: { results, total_pages, page, term, total_results },
  });
};

export const fetchDiaries = () => async (dispatch) => {
  const res = await axios.get("/api/diary");
  dispatch({ type: FETCH_DIARIES, payload: res.data });
};

export const formReview = (formData) => {
  return { type: FORM_REVIEW, payload: formData };
};

export const setSpinner = (isSpining) => {
  console.log("a");
  return { type: SET_SPINNER, payload: isSpining };
};

export const setModal = (modalMessage) => {
  return { type: SET_MODAL, payload: modalMessage };
};
