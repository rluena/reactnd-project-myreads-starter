import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Bookshelf from "../../Components/Bookshelf";
import Button from "../../Components/Elements/Button";

class Home extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading" />
            <Bookshelf title="Want to Read" />
            <Bookshelf title="Read" />
          </div>
        </div>
        <div className="open-search">
          <Button
            onClick={() => this.props.history.push("/search")}
            variant={["primary", "circle", "search"]}
          >
            Add a book
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
