import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cent">
        <Nav value="Home" />
        <div className="bg"></div>
        <Typography component="h2" variant="h2">
          Hello and Welcome!
        </Typography>
      </div>
    );
  }
}

export default HomePage;
