import React from "react";
import PropTypes from "prop-types";
import Select from "../../Elements/Select";
import "./card.css";

const Card = ({ style, title, authors, shelf, bookId, updateBookShelf }) => {
  return (
    <div className="book">
      <div className="book__top">
        <div className="book__cover" style={style ? style : {}}></div>
        <div className="book__shelf-changer">
          <Select
            value={shelf}
            modifiers={["buttoned"]}
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
            <option value="none">None</option>
          </Select>
        </div>
      </div>
      <div className="book__title">{title}</div>
      <div className="book__authors">
        {authors &&
          authors.map((author, idx) => {
            const key = `card_author_${idx}`;

            return <span key={key}>{author}</span>;
          })}
      </div>
    </div>
  );
};

Card.defaultProps = {
  style: {},
  shelf: undefined,
  authors: []
};

Card.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  bookId: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  updateBookShelf: PropTypes.func.isRequired
};

export default Card;
