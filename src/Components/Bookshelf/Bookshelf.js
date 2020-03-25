import React from "react";
import PropTypes from "prop-types";
import BookCard from "./Modules/Book";
import "./bookshelf.css";

const Bookshelf = ({ title, books, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf__title">{title}</h2>
      <div className="bookshelf__books">
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
