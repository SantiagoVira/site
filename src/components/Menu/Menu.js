import React from "react";
import "./Menu.css";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import AppsIcon from "@material-ui/icons/Apps";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import { useEffect, useState } from "react";

function Menu(props) {
    const [value, setValue] = useState(props.history.location.pathname);
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 0 ? "MenuHighlight" : ""
    );

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = () => {
        window.pageYOffset > 0 ? setScrolled("scrolled") : setScrolled("");
    };

    useEffect(() => {
        props.history.push(value);
    }, [props, value]);

    const handleChange = async (event, newValue) => {
        await setValue("");
        setValue(newValue);
    };
    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={`menuMain ${scrolled}`}
        >
            <BottomNavigationAction
                label="Home"
                value="/"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Projects"
                value="/projects/"
                icon={<AppsIcon />}
            />
            <BottomNavigationAction
                label="Resume"
                value="/resume/"
                icon={<DescriptionIcon />}
            />
        </BottomNavigation>
    );
}

export default Menu;
