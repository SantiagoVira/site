import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";
import ProjectsDiv from "./ProjectsDiv";

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cent">
        <Nav value="Favorite" /> <p style={{ marginTop: "50px" }}></p>
        <Typography variant="h3">These Are My Favorite Projects.</Typography>
        <Typography variant="h4">Enjoy!</Typography>
        <ProjectsDiv amount={4} />
      </div>
    );
  }
}

export default FavoritePage;
