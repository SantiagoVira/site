import "../App.css";
import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withStyles } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "home",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  render() {
    const actionClasses = this.props.classes;

    return (
      <BottomNavigation
        value={this.state.value}
        onChange={this.handleChange}
        classes={actionClasses}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
          classes={actionClasses}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
          classes={actionClasses}
        />
        <BottomNavigationAction
          label="All Projects"
          value="all"
          icon={<FolderIcon />}
          classes={actionClasses}
        />
        <BottomNavigationAction
          label="Me"
          value="me"
          icon={<PersonIcon />}
          classes={actionClasses}
        />
      </BottomNavigation>
    );
  }
}

const styles = {
  root: {
    background: "#282c34",
    color: "#fff",
    "&$selected": {
      color: "red",
    },
  },
  selected: {},
};

export default withStyles(styles)(Nav);
