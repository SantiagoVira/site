import React from "react";
import "./Home.css";
import UnderConstruction from "../../under construction.jpg";

function Home() {
    return (
        <div className="homepagemain">
            <h1>hey There!</h1>
            <img src={UnderConstruction} alt="under Construction" />
        </div>
    );
}

export default Home;
