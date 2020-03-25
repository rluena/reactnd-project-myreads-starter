import React, { Component } from "react";
import { search, update } from "../../BooksAPI";
import {
  checkIfBooksAreInUserShelves,
  persistBooksIdsFromShelves
} from "../../utils";
import Spinner from "../../Components/Modules/Spinner";
import SearchResult from "./SearchResult";
import SearchBooksBar from "./SearchBooksBar";

class Search extends Component {
  state = {
    books: [],
    error: null,
    isLoading: false
  };

  /**
   * Method to search books by author's name or book title
   *
   * @param {string} value Name of the author or title of the book
   * @returns {void}
   */
  searchABookByAuthorOrTitle = async value => {
    try {
      this.setState({ isLoading: true });
      const response = await search(value);

      if (!Array.isArray(response) && response.error) {
        this.setState({
          isLoading: false,
          error: response.error,
          searchQuery: null
        });
        return;
      }

      // Sometimes response value is an object when error returned by an API.
      // Which was suppose to be caught as an error and handled down below.
      if (Array.isArray(response)) {
        // Result from from search api do not show shelf status of a book. From
        // that case we shold check if a book is already added in any user's shelf.
        const checkedBooks = checkIfBooksAreInUserShelves(response);

        this.setState({
          books: checkedBooks,
          isLoading: false,
          searchQuery: value
        });
      }
    } catch (error) {
      this.setState({ books: [], error, isLoading: false });
    }
  };

  /**
   * Method to move a book from on shelf to another using the API
   *
   * @param {string} bookId An ID of the book.
   * @param {string} shelf Identifier for a shelf book should be moved to.
   */
  updateBookShelf = async (bookId, shelf) => {
    try {
      // Showing loader when updating content
      this.setState({ isLoading: true });
      const response = await update(bookId, shelf);

      if (response) {
        // Persisting ID's of the books in shelfves in the localStorage.
        // You can check on the function's comment to
        // grasp the reason why we do this.
        persistBooksIdsFromShelves(response);

        // Checking if a book is already in a particular shelf and assign or update
        // `book.shelf` property to a different value.
        const checkedBooks = checkIfBooksAreInUserShelves(this.state.books);
        this.setState({ books: checkedBooks, isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false, error });
    }
  };

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          searchABookByAuthorOrTitle={this.searchABookByAuthorOrTitle}
        />
        {/* Showing spinner when search is requested */}
        {this.state.isLoading && <Spinner />}

        <SearchResult
          books={this.state.books}
          updateBookShelf={this.updateBookShelf}
        />
      </div>
    );
  }
}

export default Search;
