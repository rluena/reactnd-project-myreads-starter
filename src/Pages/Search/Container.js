import React, { Component } from "react";
import SearchResult from "./SearchResult";
import SearchBooksBar from "./SearchBooksBar";

class Search extends Component {
  render() {
    return (
      <div className="search-books">
        <SearchBooksBar />
        <SearchResult />
      </div>
    );
  }
}

export default Search;
