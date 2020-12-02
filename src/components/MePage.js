import "./MePage.css";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";
import logo from "../img.png";
import React from "react";

function MePage() {
    return (
        <div className="main">
            <Nav value="Me" />
            <Typography variant="h2">Hi There!</Typography>
            <div className="center">
                <img alt="icon" src={logo} className="Me" />

                <p className="desc">
                    Hello, my name is Santiago. I am currently a Freshman in
                    high school, and I love coding. I am one of the many people
                    who started coding during the summer of the pandemic. After
                    summer was over, I kept doing it more and more and kept
                    getting better. Now I have this website to display my
                    projects. There's not much more to say here, except for
                    check out my projects. I had fun making them and I think
                    they are cool.
                </p>
            </div>
        </div>
    );
}

export default MePage;
