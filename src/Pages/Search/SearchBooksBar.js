import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SearchInput from "./SearchInput";
import Button from "../../Components/Elements/Button";

const SearchBooksBar = ({ searchABookByAuthorOrTitle, history }) => {
  return (
    <div className="search-books-bar">
      <Button onClick={() => history.push("/")} modifiers={["back"]}>
        Close
      </Button>
      <SearchInput searchABookByAuthorOrTitle={searchABookByAuthorOrTitle} />
    </div>
  );
};

SearchBooksBar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  searchABookByAuthorOrTitle: PropTypes.func.isRequired
};

export default withRouter(SearchBooksBar);
