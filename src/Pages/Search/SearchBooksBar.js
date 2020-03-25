/**
 * @module Pages/SearchBooksBar
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SearchInput from "./SearchInput";
import Button from "../../Components/Elements/Button";

/**
 * React component for search bar.
 *
 * @description Subcomponent of Search component
 * @param {Object} props
 */
const SearchBooksBar = ({ searchABookByAuthorOrTitle, history }) => {
  return (
    <div className="search-books__search-bar">
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
