import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="cent">
        <Nav value="Favorite" /> <h1>Look At Them Favs</h1>
      </div>
    );
  }
}

export default FavoritePage;
