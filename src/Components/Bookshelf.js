import React from "react";
import PropTypes from "prop-types";
import BookCard from "./Modules/Book";

const Bookshelf = ({ title, books, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
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
  title: PropTypes.string.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
};

export default Bookshelf;
