import React from "react";
import Select from "../../Elements/Select";
import "./card.css";

const Card = ({ style, title, author }) => {
  return (
    <div className="book">
      <div className="book__top">
        <div className="book__cover" style={style}></div>
        <div className="book__shelf-changer">
          <Select modifiers={["buttoned"]}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </Select>
        </div>
      </div>
      <div className="book__title">{title}</div>
      <div className="book__authors">{author}</div>
    </div>
  );
};

export default Card;
