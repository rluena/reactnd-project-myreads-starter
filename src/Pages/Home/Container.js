import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getAll } from "../../BooksAPI";
import Bookshelf from "../../Components/Bookshelf";
import Button from "../../Components/Elements/Button";
import Spinner from "../../Components/Vendors/Spinner";

class Home extends Component {
  state = {
    isLoading: true,
    error: null,
    books: []
  };

  componentDidMount = async () => {
    try {
      const data = await getAll();
      if (data && data.length) {
        this.setState({ books: data, isLoading: false });
      }
    } catch (error) {
      console.error(error);
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
              />
              <Bookshelf title="Want to Read" books={wantToReadBooks} />
              <Bookshelf title="Read" books={readBooks} />
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
