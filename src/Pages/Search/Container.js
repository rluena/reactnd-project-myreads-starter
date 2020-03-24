import React, { Component } from "react";
import { search, update } from "../../BooksAPI";
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
      const books = await search(value);

      if (!Array.isArray(books) && books.error) {
        this.setState({
          isLoading: false,
          error: books.error,
          searchQuery: null
        });
        return;
      }

      if (Array.isArray(books) && books.length) {
        this.setState({ books, isLoading: false, searchQuery: value });
      }
    } catch (error) {
      this.setState({ books: [], error: false, isLoading: false });
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
        // We have to retreive all books again
        // to get new updated values from the API.
        await this.searchABookByAuthorOrTitle(this.state.searchQuery);
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
