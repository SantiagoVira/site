import React from "react";
import "./Home.css";

import Col from "../Utils/Col";

function Home() {
    return (
        <Col className="homepagemain">
            <p className="homeMyName">Santiago Vira</p>
            <p className="homeMyDescription">
                I am a highschool student and self-taught programmer. I built
                this website using React.js to display my projects and
                experience. Feel free to contact me with any questions or
                opportunities!
            </p>
        </Col>
    );
}

export default Home;
