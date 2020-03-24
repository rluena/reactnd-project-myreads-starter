import React, { Component } from "react";
import Text from "../../Components/Elements/Text";

class Search extends Component {
  state = {
    input: ""
  };

  inputHandler = () => {};

  render() {
    return (
      <div className="search-books-input-wrapper">
        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
        <Text
          placeholder="Search by title or author"
          onChange={this.inputHandler}
        />
      </div>
    );
  }
}

export default Search;
