import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

class MePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="cent">
        <Nav value="Me" />
        <Typography component="h4" variant="h4">
          Hi There! Me is it
        </Typography>
      </div>
    );
  }
}

export default MePage;
