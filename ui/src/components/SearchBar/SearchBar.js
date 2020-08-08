import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchMovies = (e) => {
    e.preventDefault();
    const term = e.target.input.value;
    dispatch(actions.fetchMovies(term));
  };

  return (
    <>
      <form onSubmit={searchMovies} className={classes.form}>
        <input className={classes.input} name="input" type="text" />
        <button className={classes.button}>Search</button>
      </form>
    </>
  );
};
export default SearchBar;
