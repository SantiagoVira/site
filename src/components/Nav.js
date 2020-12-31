import "../App.css";
import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withStyles } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value.toString(),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({ value: newValue });
        document.location.href = "/" + newValue;
    }

    render() {
        const actionClasses = this.props.classes;

        return (
            <BottomNavigation
                value={this.state.value}
                onChange={this.handleChange}
                classes={actionClasses}
                id="NavBar"
            >
                <BottomNavigationAction
                    label="Home"
                    value="Home"
                    icon={<HomeIcon />}
                    classes={actionClasses}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="Favorite"
                    icon={<FavoriteIcon />}
                    classes={actionClasses}
                />
                <BottomNavigationAction
                    label="All Projects"
                    value="All"
                    icon={<FolderIcon />}
                    classes={actionClasses}
                />
                <BottomNavigationAction
                    label="Games"
                    value="Games"
                    icon={<SportsEsportsIcon />}
                    classes={actionClasses}
                />
                <BottomNavigationAction
                    label="Me"
                    value="Me"
                    icon={<PersonIcon />}
                    classes={actionClasses}
                />
            </BottomNavigation>
        );
    }
}

const styles = {
    root: {
        background: getComputedStyle(document.body)
            .getPropertyValue("--bg")
            .toString(),
        color: "#fff",
        "&$selected": {
            color: "red",
        },
    },
    selected: { color: "red" },
};

export default withStyles(styles)(Nav);
