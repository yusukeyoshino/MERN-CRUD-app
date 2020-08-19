import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import Cards from "./Cards";

const MovieLists = () => {
  return (
    <div style={{ paddingBottom: "50px" }}>
      <SearchBar />
      <Cards />
    </div>
  );
};

export default MovieLists;
