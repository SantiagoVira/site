import "../App.css";
import React from "react";
import Nav from "./Nav";

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav value="Favorite" /> <h1>Look At Them Favs</h1>
      </div>
    );
  }
}

export default FavoritePage;
