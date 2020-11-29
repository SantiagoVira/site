import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

class Error404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="cent">
        <Nav value="404" /> <h1>Thats an oops</h1>
      </div>
    );
  }
}

export default Error404;
