import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";
import classes from "./SearchBar.module.css";
import { Button, Input } from "@material-ui/core";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchMovies = (e) => {
    e.preventDefault();
    dispatch(actions.setSpinner(true));
    const term = e.target.input.value;
    dispatch(actions.fetchMovies(term));

    dispatch(actions.setSpinner(false));
  };

  return (
    <>
      <form onSubmit={searchMovies} className={classes.form}>
        <input className={classes.input} name="input" type="text" />

        <input style={{ display: "none" }} id="search-movie" type="submit" />
        <label htmlFor="search-movie">
          <Button variant="outlined" color="secondary" component="span">
            Search
          </Button>
        </label>
      </form>
    </>
  );
};
export default SearchBar;
