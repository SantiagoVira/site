import "../App.css";
import React from "react";
import Typography from "@material-ui/core/Typography";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="cent">
        <h1>{this.props.id}</h1>
        <h1>{this.props.desc}</h1>
        <h1>{this.props.img}</h1>
        <h1>{this.props.file}</h1>
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}

export default Project;
