import "../App.css";
import React from "react";
import Nav from "./Nav";

class MePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav value="Me" /> <h1>And Thats me lol</h1>
      </div>
    );
  }
}

export default MePage;
