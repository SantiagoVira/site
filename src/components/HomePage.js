import "../App.css";
import React from "react";
import Nav from "./Nav";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav value="Home" /> <h1>Ur Home</h1>
      </div>
    );
  }
}

export default HomePage;
