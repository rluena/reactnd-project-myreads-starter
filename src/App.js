import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./assets/styles/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
