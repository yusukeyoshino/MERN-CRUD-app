import axios from "axios";
import { FETCH_USER, FETCH_MOVIES, FETCH_DIARIES } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchMovies = (term) => async (dispatch) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_IMDB_KEY}&language=en-US&query=${term}&include_adult=false`
  );
  console.log(res);
  dispatch({ type: FETCH_MOVIES, payload: res.data.results });
};

export const fetchDiaries = () => async (dispatch) => {
  const res = await axios.get("/api/diary");
  dispatch({ type: FETCH_DIARIES, payload: res.data });
};