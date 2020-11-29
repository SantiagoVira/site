import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

class AllPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="cent">
        <Nav value="All" /> <h1>Look at all of em</h1>
      </div>
    );
  }
}

export default AllPage;
