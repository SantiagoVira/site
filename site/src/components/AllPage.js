import "../App.css";
import React from "react";
import Nav from "./Nav";

class AllPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav value="All" /> <h1>Look at all of em</h1>
      </div>
    );
  }
}

export default AllPage;
