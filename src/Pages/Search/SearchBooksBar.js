import React from "react";
import { withRouter } from "react-router-dom";
import SearchInput from "./SearchInput";
import Button from "../../Components/Elements/Button";

const SearchBooksBar = ({ history }) => {
  return (
    <div className="search-books-bar">
      <Button onClick={() => history.push("/")} modifiers={["back"]}>
        Close
      </Button>
      <SearchInput />
    </div>
  );
};

export default withRouter(SearchBooksBar);
