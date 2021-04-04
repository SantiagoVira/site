import React from "react";
import "./Utils.css";

function Col(props) {
    return (
        <div className={`Col ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}

export default Col;
