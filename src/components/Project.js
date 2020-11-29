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
      <div className="cent" id={this.props.id}>
        <Typography variant="h2">{this.props.name}</Typography>
        <a href={this.props.file}>
          <img alt="Icon" src={this.props.img} />
        </a>
        <Typography variant="h5">{this.props.desc}</Typography>
      </div>
    );
  }
}

export default Project;
