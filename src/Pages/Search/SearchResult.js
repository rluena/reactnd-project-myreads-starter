import React from "react";
import PropTypes from "prop-types";
import Book from "../../Components/Modules/Book";

const SearchResult = ({ books, updateBookShelf }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books &&
          books.length > 1 &&
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
