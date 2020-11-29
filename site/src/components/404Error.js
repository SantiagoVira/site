import "../App.css";
import React from "react";
import Nav from "./Nav";

class Error404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav value="404" /> <h1>Thats an oops</h1>
      </div>
    );
  }
}

export default Error404;
