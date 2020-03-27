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
const SearchResult = ({ books, noResultFound, updateBookShelf }) => {
  return (
    <div className="search-books__results">
      {!noResultFound && (
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
      )}

      {noResultFound && (
        <h6 className="search-books__not-found">No result found.</h6>
      )}
    </div>
  );
};

SearchResult.defaultProps = {
  books: []
};

SearchResult.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  updateBookShelf: PropTypes.func.isRequired,
  noResultFound: PropTypes.bool.isRequired
};

export default SearchResult;
