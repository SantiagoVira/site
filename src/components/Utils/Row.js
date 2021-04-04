import React from "react";
import "./Utils.css";

function Row(props) {
    return (
        <div className={`Row ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}

export default Row;
