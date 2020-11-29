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
        <Nav value="404" />
        <Typography variant="h2">Thats an oops,</Typography>
        <Typography variant="h3">No page here</Typography>
      </div>
    );
  }
}

export default Error404;
