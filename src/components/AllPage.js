import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";
import ProjectsDiv from "./ProjectsDiv";

class AllPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cent">
        <Nav value="All" /> <p style={{ marginTop: "50px" }}></p>
        <Typography variant="h3">
          This is every single JavaScript project I have created
        </Typography>
        <Typography variant="h6">(That are worth showing)</Typography>
        <p style={{ marginTop: "150px" }}></p>
        <ProjectsDiv all={true} />
      </div>
    );
  }
}

export default AllPage;
