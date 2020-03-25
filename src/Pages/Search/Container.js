import React, { Component } from "react";
import { search, update } from "../../BooksAPI";
import {
  checkIfBooksAreInUserShelves,
  persistBooksIdsFromShelves,
  filterBooksWithoutThumbnail
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
        // Filter books without thumbnail
        const filteredBooks = filterBooksWithoutThumbnail(response);

        // Result from from search api do not show shelf status of a book. From
        // that case we shold check if a book is already added in any user's shelf.
        const checkedBooks = checkIfBooksAreInUserShelves(filteredBooks);

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

      // Sometimes update fails returns an error.
      if (response && !response.error) {
        // Everytime shelf is updated, we persist new updates in localStorage.
        persistBooksIdsFromShelves(response);

        // Updating books' shelves status.
        const updatedBooks = checkIfBooksAreInUserShelves(this.state.books);
        this.setState({ books: updatedBooks, isLoading: false });
      }

      this.setState({
        isLoading: false,
        error: response.error
          ? response.error
          : "There is an error please try again in a minute."
      });
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
