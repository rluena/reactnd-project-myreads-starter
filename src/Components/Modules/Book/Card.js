import React from "react";
import PropTypes from "prop-types";
import Select from "../../Elements/Select";
import "./card.css";

const Card = ({ book, updateBookShelf }) => {
  const { shelf, title, authors, id: bookId } = book;

  return (
    <div className="book">
      <div className="book__top">
        <div
          className="book__cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}
        ></div>
        <div className="book__shelf-changer">
          <Select
            value={shelf}
            modifiers={["rounded"]}
            onChange={evt => updateBookShelf(bookId, evt.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option
              value="currentlyReading"
              disabled={shelf === "currentlyReading"}
            >
              Currently Reading
            </option>
            <option value="wantToRead" disabled={shelf === "wantToRead"}>
              Want to Read
            </option>
            <option value="read" disabled={shelf === "read"}>
              Read
            </option>
            <option value="none" disabled={!shelf || shelf === "none"}>
              None
            </option>
          </Select>
        </div>
      </div>
      <div className="book__title">{title}</div>
      <div className="book__authors">
        {authors && authors.length && authors.join(", ").toString()}
      </div>
    </div>
  );
};

Card.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

export default Card;
