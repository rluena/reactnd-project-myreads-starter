import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import Text from "../../Components/Elements/Text";

class Search extends Component {
  state = {
    input: ""
  };

  inputHandler = evt => {
    const { value } = evt.target;
    const search = debounce(this.props.searchABookByAuthorOrTitle, 1500);
    search(value.trim());
    this.setState({ input: value });
  };

  render() {
    return (
      <div className="search-books__input-wrapper">
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
          value={this.state.input}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchABookByAuthorOrTitle: PropTypes.func.isRequired
};

export default Search;
