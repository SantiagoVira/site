import "../App.css";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const classes = this.props.classes;
    return (
      <div className="cent projlink" id={this.props.id}>
        <Typography variant="h2">{this.props.name}</Typography>
        <a href={this.props.file}>
          <img alt="Icon" src={this.props.img} className="projimg" />
        </a>
        <Typography
          noWrap={false}
          align="center"
          variant="h5"
          component="h5"
          className={classes.title}
        >
          {this.props.desc}
        </Typography>
        <p style={{ marginTop: "150px" }}></p>
      </div>
    );
  }
}

const styles = {
  title: {
    flexGrow: 1,
    textAlign: "center",
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default withStyles(styles)(Project);
