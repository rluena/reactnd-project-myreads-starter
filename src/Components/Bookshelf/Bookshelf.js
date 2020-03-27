import React from "react";
import PropTypes from "prop-types";
import BookCard from "../Modules/Book";
import "./bookshelf.css";

const Bookshelf = ({ shelf, books, updateBookShelf }) => {
  const shelfBooks = books.filter(book => book.shelf === shelf.key);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf__title">{shelf.title}</h2>
      <div className="bookshelf__books">
        <ol className="books-grid">
          {shelfBooks.map(book => {
            return (
              <li key={book.id}>
                <BookCard book={book} updateBookShelf={updateBookShelf} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  shelf: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

export default Bookshelf;
