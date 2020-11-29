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
      <div className="cent">
        <Nav value="Home" />
        <p className="t1">Hello and Welcome to...</p>
        <p className="t2">My Website!</p>
        <p className="t3">(It's Pretty Cool)</p>
      </div>
    );
  }
}

export default HomePage;
