import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  persistBooksIdsFromShelves,
  checkIfBooksAreInUserShelves
} from "../../utils/index";
import { getAll, update } from "../../BooksAPI";
import Bookshelf from "../../Components/Bookshelf";
import Button from "../../Components/Elements/Button";
import Spinner from "../../Components/Modules/Spinner";

class Home extends Component {
  state = {
    isLoading: true,
    error: null,
    books: []
  };

  componentDidMount = async () => {
    await this.getAllBooks();
  };

  /**
   * Retreiving all user's books from the API
   */
  getAllBooks = async () => {
    try {
      const data = await getAll();

      if (data) {
        this.setState({ books: data, isLoading: false });
      } else {
        this.setState({ books: [], isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false, error });
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
    const { books, isLoading } = this.state;

    const currentlyReadingBooks = books.filter(
      book => book.shelf === "currentlyReading"
    );

    const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");

    const readBooks = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {!isLoading ? (
            <div>
              <Bookshelf
                title="Currently Reading"
                books={currentlyReadingBooks}
                updateBookShelf={this.updateBookShelf}
              />
              <Bookshelf
                title="Want to Read"
                books={wantToReadBooks}
                updateBookShelf={this.updateBookShelf}
              />
              <Bookshelf
                title="Read"
                books={readBooks}
                updateBookShelf={this.updateBookShelf}
              />
            </div>
          ) : (
            <div className="spinner__container">
              <Spinner />
            </div>
          )}
        </div>
        <div className="open-search">
          <Button
            onClick={() => this.props.history.push("/search")}
            modifiers={["primary", "circle", "search"]}
          >
            Add a book
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
