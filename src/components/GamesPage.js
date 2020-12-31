import "../App.css";
import React from "react";
import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";
import GamesDiv from "./GamesDiv";

class GamesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="cent">
                <Nav value="Games" /> <p style={{ marginTop: "50px" }}></p>
                <Typography variant="h3">
                    These are all of the online games I have made
                </Typography>
                <p style={{ marginTop: "150px" }}></p>
                <GamesDiv all={true} />
            </div>
        );
    }
}

export default GamesPage;
