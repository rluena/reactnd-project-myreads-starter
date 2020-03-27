/**
 * @module Pages/SearchResult
 */

import React from "react";
import PropTypes from "prop-types";
import Book from "../../Components/Modules/Book";

/**
 * React component that holding search results
 *
 * @param {Object} props
 */
const SearchResult = ({ books, updateBookShelf }) => {
  return (
    <div className="search-books__results">
      <ol className="books-grid">
        {books &&
          books.length > 0 &&
          books.map(book => {
            const key = `result_${book.id}`;
            return (
              <li key={key}>
                <Book book={book} updateBookShelf={updateBookShelf} />
              </li>
            );
          })}
      </ol>
    </div>
  );
};

SearchResult.defaultProps = {
  books: []
};

SearchResult.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  updateBookShelf: PropTypes.func.isRequired
};

export default SearchResult;
