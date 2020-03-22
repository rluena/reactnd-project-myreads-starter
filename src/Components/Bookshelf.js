import React from "react";
import PropTypes from "prop-types";
import BookCard from "./Modules/Book";

const Bookshelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            return (
              <li key={book.id}>
                <BookCard
                  title={book.title}
                  author="Harper Lee"
                  authors={book.authors}
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                  }}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired
};

export default Bookshelf;
