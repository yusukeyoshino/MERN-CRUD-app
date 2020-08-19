import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";

import { Button, TextField } from "@material-ui/core";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchMovies = (e) => {
    e.preventDefault();

    dispatch(actions.setSpinner(true));
    const term = e.target.search_term.value;

    dispatch(actions.fetchMovies(term, 1));

    dispatch(actions.setSpinner(false));
  };

  return (
    <>
      <form
        onSubmit={searchMovies}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          name="search_term"
          variant="outlined"
          required
          label="Movie Title"
          size="small"
        />

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
