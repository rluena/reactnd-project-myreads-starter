import React, { Component } from "react";
import { search } from "../../BooksAPI";
import SearchResult from "./SearchResult";
import SearchBooksBar from "./SearchBooksBar";

class Search extends Component {
  state = {
    books: [],
    error: null,
    isSearching: false
  };

  /**
   * Method to search books by author's name or book title
   *
   * @param {string} value Name of the author or title of the book
   * @returns {void}
   */
  searchABookByAuthorOrTitle = async value => {
    try {
      this.setState({ isSearching: true });
      const books = await search(value);

      if (!Array.isArray(books) && books.error) {
        this.setState({ isSearching: false, error: books.error });
        return;
      }

      if (Array.isArray(books) && books.length) {
        this.setState({ books, isSearching: false });
      }
    } catch (error) {
      this.setState({ error: false, isSearching: false });
    }
  };

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          searchABookByAuthorOrTitle={this.searchABookByAuthorOrTitle}
        />
        <SearchResult />
      </div>
    );
  }
}

export default Search;
